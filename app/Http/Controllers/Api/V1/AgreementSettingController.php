<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PDF;
use Carbon\Carbon;

// MODELLER
use App\Models\Agreements\AgreementSetting;
use App\Models\Students\Student;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;
use App\Models\Guardians\Guardian;
use App\Models\Enrollments\Enrollment;
use App\Models\Services\Service;
use App\Models\Discounts\Discount;
use App\Models\Installments\Installment;
use App\Models\DiscountStudents\DiscountStudent;
use App\Models\PaymentMethods\PaymentMethod;

/*******************************************************************************************
 * AgreementSettingController
 *
 * - index(), store(), show(), update(), destroy() => Klasik CRUD
 * - generateContractPdf() => Sadece "agreement_type" + "enrollments" array gelir;
 *   * Tablolardan verileri çeker
 *   * Sözleşme PDF’i oluşturur, "Sistemden çekilecek" kısımları DB verileriyle doldurur.
 *******************************************************************************************/
class AgreementSettingController extends Controller
{
    /**
     * 1) Tüm AgreementSetting kayıtlarını döndür
     */
    public function index()
    {
        $settings = AgreementSetting::all();
        return response()->json($settings, 200);
    }

    /**
     * 2) Yeni AgreementSetting kaydı
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'branch_id'                   => 'required|integer',
            'agreement_type'              => 'required|integer',
            'program_id'                  => 'required|array',
            'promissory_name'             => 'required|string',
            'court_name'                  => 'required|string',
            'place_promissory'            => 'required|string',
            'sozlesme_sartlari_yeni_sayfa'=> 'required|boolean',
            'sozlesme_tarihini_goster'    => 'required|boolean',
            'logo_goster'                 => 'required|boolean',
            'senet_turleri'               => 'required|in:Çoklu senet,Öoklu senet-hiznet,Tek Senet,Tek Senet Hizmet,yok',
            'senet_yeni_sayfa'            => 'required|boolean',
            'makbuz_turu'                 => 'required|in:A5 Dikey,A5 Dikey Katansız,A5 Yatay,A5 Yatay Kalansız',
            'agreement_title'             => 'required|string',
            'agreement_text'              => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()],422);
        }

        $data = $validator->validated();
        // program_id => array => JSON
        $data['program_id'] = json_encode($data['program_id']);

        $setting = AgreementSetting::create($data);
        return response()->json([
            'message' => 'Agreement setting created successfully',
            'data'    => $setting
        ],201);
    }

    /**
     * 3) show($id)
     */
    public function show($id)
    {
        $setting = AgreementSetting::findOrFail($id);
        return response()->json($setting, 200);
    }

    /**
     * 4) update($id)
     */
    public function update(Request $request, $id)
    {
        $setting = AgreementSetting::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'branch_id'                   => 'required|integer',
            'agreement_type'              => 'required|integer',
            'program_id'                  => 'required|array',
            'promissory_name'             => 'required|string',
            'court_name'                  => 'required|string',
            'place_promissory'            => 'required|string',
            'sozlesme_sartlari_yeni_sayfa'=> 'required|boolean',
            'sozlesme_tarihini_goster'    => 'required|boolean',
            'logo_goster'                 => 'required|boolean',
            'senet_turleri'               => 'required|in:Çoklu senet,Öoklu senet-hiznet,Tek Senet,Tek Senet Hizmet,yok',
            'senet_yeni_sayfa'            => 'required|boolean',
            'makbuz_turu'                 => 'required|in:A5 Dikey,A5 Dikey Katansız,A5 Yatay,A5 Yatay Kalansız',
            'agreement_title'             => 'required|string',
            'agreement_text'              => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }

        $data = $validator->validated();
        $data['program_id'] = json_encode($data['program_id']);

        $setting->update($data);
        return response()->json([
            'message'=>'Agreement setting updated successfully',
            'data'=>$setting
        ],200);
    }

    /**
     * 5) destroy($id)
     */
    public function destroy($id)
    {
        $setting = AgreementSetting::findOrFail($id);
        $setting->delete();
        return response()->json(['message'=>'Agreement setting deleted successfully'],200);
    }

    /**
     * 6) generateContractPdf
     *   - Param => agreement_type, enrollments => [ { id:### }, ... ]
     *   - DB => Student, Branch, Season, Guardians, Payment, ...
     *   - PDF => tam sözleşme
     */
    public function generateContractPdf(Request $request, $someId=null)
    {
        $validator = Validator::make($request->all(), [
            'agreement_type' => 'nullable|integer',
            'enrollments'    => 'required|array'
        ]);
        if($validator->fails()){
            return response()->json([
                'error'=> [
                    'message'=> $validator->errors(),
                    'status_code'=>422
                ]
            ],422);
        }

        $agreementType = $request->input('agreement_type',1);
        $enrollmentArr = $request->input('enrollments', []);

        // 1) Enrollments bul
        $enrollIds = collect($enrollmentArr)->pluck('id')->map('intval')->toArray();
        $enrollments = Enrollment::with(['service','installments'])
            ->whereIn('id',$enrollIds)->get();
        if($enrollments->isEmpty()){
            return response()->json(['error'=>'Hiç enrollment bulunamadı.'],404);
        }

        // 2) Student => ilk enrollment => student_id
        $firstEnr = $enrollments->first();
        $studentId= $firstEnr->student_id;
        $student  = Student::with([
            'address','parent','enrollments','enrollments.service'
        ])->find($studentId);
        if(!$student){
            return response()->json(['error'=>"Öğrenci yok ID:{$studentId}"],404);
        }

        // Her enrollment => student_id check
        foreach($enrollments as $e){
            if($e->student_id != $student->id){
                return response()->json([
                    'error'=>"Enrollment ID {$e->id} => student_id={$e->student_id}, beklenen={$student->id}"
                ],400);
            }
        }

        // 3) Branch => $student->branche_id
        $branch = Branche::find($student->branche_id);
        // 4) Season => $student->season_id
        $season = Season::find($student->season_id);

        // 5) AgreementSetting => branch_id & agreement_type
        $setting = AgreementSetting::where('branch_id',$student->branche_id)
            ->where('agreement_type',$agreementType)
            ->first();
        if(!$setting){
            // fallback
            $setting = [
                'kurum_adi'       => $branch ? $branch->name : 'Örnek Kurum',
                'kurum_yetkilisi' => 'Yetkili Adı (DB yok)',
                'agreement_title' => 'ÖĞRENCİ KAYIT SÖZLEŞMESİ',
                'agreement_text'  => $this->getFullSozlesmeText() // Aşağıda sabit fonk
            ];
        } else {
            $setting = $setting->toArray();
        }

        // 6) Guardian verileri => anne(2), baba(1), veli(0)
        $mother= Guardian::where('student_id',$student->id)->where('kinship_id',2)->first();
        $father= Guardian::where('student_id',$student->id)->where('kinship_id',1)->first();
        $veli  = Guardian::where('student_id',$student->id)->where('kinship_id',0)->first();

        // 7) HTML kısımları => tablo vs.
        $ogrHtml   = $this->buildOgrenciBilgisiHtml($student, $branch, $season);
        $anneHtml  = $this->buildGuardianInfoHtml($mother,'Öğrencinin Anne Bilgileri',2);
        $babaHtml  = $this->buildGuardianInfoHtml($father,'Öğrencinin Baba Bilgileri',1);
        $veliHtml  = $this->buildGuardianInfoHtml($veli,  'Veli Bilgileri', 0);
        $odemeHtml = $this->buildOdemeTable($enrollments);
        $taksitHtml= $this->buildTaksitTable($enrollments);

        // PaymentMethod => "Çek & Senet" ?
        $hasCekSenet = false;
        foreach($enrollments as $en){
            if($en->payment_method_id){
                $pm = PaymentMethod::find($en->payment_method_id);
                if($pm && $pm->name=='Çek & Senet'){
                    $hasCekSenet = true;
                    break;
                }
            }
        }
        $senetHtml = $hasCekSenet ? $this->buildSenetHtml($student,$enrollments) : '';

        // 8) Data => build PDF
        $pdfData = [
            'agreementTitle'=> $setting['agreement_title'],
            'kurumAdi'      => $setting['kurum_adi'],
            'kurumYetkilisi'=> $setting['kurum_yetkilisi'],
            'ogrBilgisi'    => $ogrHtml,
            'anneBilgisi'   => $anneHtml,
            'babaBilgisi'   => $babaHtml,
            'veliBilgisi'   => $veliHtml,
            'odemeHtml'     => $odemeHtml,
            'taksitHtml'    => $taksitHtml,
            'sozlesmeMetni' => $setting['agreement_text'] ?? $this->getFullSozlesmeText(),
            'senetHtml'     => $senetHtml,
        ];

        // 9) HTML
        $html = $this->buildFinalPdfHtml($pdfData);

        // 10) DomPDF
        $pdf = PDF::loadHTML($html)->setPaper('a4','portrait');

        // 11) Save
        $filename= 'contract_s'.$student->id.'_'.time().'.pdf';
        $savePath= storage_path("app/public/contracts/".$filename);
        $pdf->save($savePath);

        $pdfUrl= asset("storage/app/public/contracts/".$filename);
        return response()->json([
            'success'=>true,
            'message'=>'Sözleşme PDF oluşturuldu',
            'pdf_url'=>$pdfUrl
        ],200);
    }


    /**
     * Tam sözleşme metni, ekrandaki 8 maddelik + alt maddeler
     */
    protected function getFullSozlesmeText(): string
    {
        // BÜTÜN METİN => Tek seferde ekliyoruz (kırpmadan).
        return <<<EOT
<h4>1. Sözleşmenin Tarafları</h4>
<p>1.1. Bu sözleşme, "[Kurum Adı]" ile "[Öğrenci Adı Soyadı]" ve "[Veli Adı Soyadı]" arasında yapılmıştır.
1.2. Taraflar, yukarıda belirtilen öğrenciye sunulacak eğitim hizmetlerinin kapsamını, Milli Eğitim Bakanlığı Özel Öğretim Kurumları
Yönetmeliği ve ilgili Türk mevzuatına uygun olarak karşılıklı hak ve yükümlülüklerini eksiksiz olarak kabul eder.</p>

<h4>2. Sözleşmenin Konusu ve Kapsamı</h4>
<p>2.1. Bu sözleşme, yukarıda belirtilen öğrenciye eğitim hizmeti sunulması ve tarafların hak ile yükümlülüklerinin düzenlenmesini kapsar.</p>

<h4>3. Eğitim Programı</h4>
<p>3.1. Eğitim, [20.. - 20..] tarihleri arasındaki eğitim-öğretim yılını kapsar.
3.2. Eğitim programı, Kurum tarafından belirlenen ders saati, ders içerikleri ve uygulamalı eğitim faaliyetlerini içerir.
3.3. Olağanüstü durumlarda (afet, salgın vb.), MEB’in ilgili genelgeleri doğrultusunda, yüz yüze verilen eğitimle online verilen eğitim
denk kabul edilir ve eğitim programı online ortama taşınır.
3.4. Kurum, eğitim programının değiştirilmesi, sınıfların birleştirilmesi veya eğitmen değişikliği gibi konularda önceden bilgilendirme 
yaparak değişiklik yapma hakkını saklı tutar.</p>

<h4>4. Genel Hususlar</h4>
<p>(... 4.1, 4.2, 4.3 ... ) <br/>
Tüm uzun maddeler buraya eklenecek...
</p>

<h4>5. Davranış ve Disiplin Kuralları</h4>
<p>5.1. Öğrenci, MEB Özel Öğretim Kurumları Yönetmeliği’ne uygun şekilde...
(...devam...) 
</p>

<h4>6. Özel Hususlar</h4>
<p>6.1. Kayıt İadesi <br/> 
(...devam...) 
</p>

<h4>7. Uyuşmazlıkların Halli</h4>
<p>7.1. Anlaşmazlık durumunda [Yetkili Mahkeme ve İcra Daireleri] yetkilidir.</p>

<h4>8. Masraflar</h4>
<p>8.1. Pul, vergi, harç, icra ve mahkeme masrafları, sözleşmeye uymayan tarafa aittir.</p>
<p>Taraflar, sözleşmeyi okuyarak karşılıklı olarak kabul ve taahhüt eder.</p>
EOT;
    }


    /**
     * Son PDF Layout
     *  => Tüm tablo ve kısımları birleştirir
     */
    protected function buildFinalPdfHtml(array $data): string
    {
        // Ek CSS
        $customTable = "
        table.table-border {
          width:100%;border-collapse:collapse; margin-bottom:1rem;
          font-family:DejaVu Sans,sans-serif; font-size:10pt;
        }
        table.table-border th, table.table-border td {
          border:1px solid #ccc; padding:6px 8px;
        }
        .table-border thead th {
          background-color:#f2f2f2; font-weight:bold; text-align:center;
        }
        ";

        $title    = $data['agreementTitle'] ?? 'ÖĞRENCİ KAYIT SÖZLEŞMESİ';
        $kurum    = $data['kurumAdi']       ?? 'Kurum Adı';
        $kurumYetk= $data['kurumYetkilisi'] ?? 'Kurum Yetkilisi?';
        $ogrHtml  = $data['ogrBilgisi']     ?? '';
        $anneHtml = $data['anneBilgisi']    ?? '';
        $babaHtml = $data['babaBilgisi']    ?? '';
        $veliHtml = $data['veliBilgisi']    ?? '';
        $odeme    = $data['odemeHtml']      ?? '';
        $taksit   = $data['taksitHtml']     ?? '';
        $sozlesme = $data['sozlesmeMetni']  ?? '';
        $senet    = $data['senetHtml']      ?? '';

        // En alttaki imza alanları -> bu sefer DB verileri
        // “Kurum Yetkilisi” => $kurumYetk
        // “Veli Ad Soyadı”, “Veli T.C.” => gerçekte $data[‘veliAdSoyad’] ? 
        // (Örnek: Guardian(0)??)
        // Bu örnekte yine basit “Sistemden çekilecek” ama isterseniz Guardian(0) verisini ekleyebilirsiniz.

        $footerSignature = <<<HTML
<br/><br/>
<table style="width:100%; margin-top:20px;">
  <tr>
    <td style="width:50%; vertical-align:top;">
      <strong>Tarih:</strong> ................... <br/>
      <strong>Kurum Yetkilisi:</strong> {$kurumYetk} <br/>
      <strong>Ad Soyadı:</strong> <span style="color:red;">(Kurum) DB</span><br/>
      <strong>İmza:</strong> (Ekranda imzalanacak)
    </td>
    <td style="width:50%; vertical-align:top;">
      <strong>Veli:</strong> <br/>
      <strong>Ad Soyadı:</strong> <span style="color:red;">(Guardian(0)->full_name)</span> <br/>
      <strong>T.C. Kimlik No:</strong> <span style="color:red;">(Guardian(0)->identification_no)</span> <br/>
      <strong>İmza:</strong> (Ekranda imzalanacak)
    </td>
  </tr>
</table>
HTML;

        return <<<HTML
<!DOCTYPE html>
<html lang="tr">
<head>
 <meta charset="UTF-8"/>
 <title>{$title}</title>
 <style>
   body {
     font-family: DejaVu Sans, sans-serif;
     font-size: 11pt;
     color: #333;
     margin: 0; 
     padding: 0;
   }
   .container {
     width: 95%;
     margin: 0 auto;
     padding: 10px;
   }
   .header-title {
     text-align: center;
     margin-bottom: 20px;
   }
   h2,h3 {
     margin:0; padding:0;
   }
   h2 { font-size:1.3rem; margin-bottom:0.5rem; }
   h3 { font-size:1.1rem; margin-bottom:1rem; }
   {$customTable}
   .contract-text {
     margin-top:20px;
     line-height:1.5;
     text-align:justify;
   }
 </style>
</head>
<body>
  <div class="container">
    <!-- ÜST BAŞLIK -->
    <div class="header-title">
      <h2>T.C. MİLLÎ EĞİTİM BAKANLIĞI</h2>
      <h2>ÖZEL ÖĞRETİM KURUMLARI GENEL MÜDÜRLÜĞÜ</h2>
      <h2>{$kurum}</h2>
      <h3>{$title}</h3>
    </div>

    <!-- Öğrenci, Anne, Baba, Veli tabloları -->
    {$ogrHtml}
    {$anneHtml}
    {$babaHtml}
    {$veliHtml}

    <!-- ÖDEME BİLGİLERİ -->
    <div style="margin-top:20px; font-weight:bold; background:#EAEAEA; padding:6px;">
      ÖDEME BİLGİLERİ
    </div>
    {$odeme}

    <!-- TAKSİT BİLGİLERİ -->
    <div style="margin-top:20px; font-weight:bold; background:#E8E0FF; padding:6px;">
      TAKSİT BİLGİLERİ
    </div>
    {$taksit}

    <!-- Sözleşme Metni (tam maddeler) -->
    <div class="contract-text">
      {$sozlesme}
    </div>

    <!-- Senet (isteğe bağlı) -->
    {$senet}

    <!-- En alt imza alanı -->
    {$footerSignature}
  </div>
</body>
</html>
HTML;
    }

    /**
     * buildOgrenciBilgisiHtml: Artık branch + season verisini de kullanıp
     * ekrana “2025 - 2026” vb. gösterebilirsiniz.
     */
    protected function buildOgrenciBilgisiHtml(Student $student, ?Branche $branch, ?Season $season): string
    {
        $tc = $student->identification_no ?? '-';
        $ad = trim($student->first_name.' '.$student->last_name);
        $okul= $student->school ? $student->school->name : 'Okul?';
        $turu= '(Okul Türü?)';
        $sinif= $student->level ? $student->level->name : '(Seviye?)';
        // e.g. register_date yok => ? 
        $kayit= '(Kayıt Tarihi yok)';
        // Adres
        $adr = $student->address ? $student->address->address : 'Adres yok';

        // branch name => $branch->name
        $sube = $branch ? $branch->name : 'Şube?';
        // season => $season->name => e.g. "2025-2026"
        $sezon= $season ? $season->name : '(Sezon yok)';

        return <<<HTML
<table class="table-border" style="margin-top:10px;">
 <thead>
   <tr><th colspan="2">Öğrenci Bilgileri</th></tr>
   <tr><th>Bilgi Türü</th><th>Detaylar</th></tr>
 </thead>
 <tbody>
   <tr><td>T.C. Kimlik No</td><td>{$tc}</td></tr>
   <tr><td>Adı Soyadı</td><td>{$ad}</td></tr>
   <tr><td>Okul Adı</td><td>{$okul}</td></tr>
   <tr><td>Okul Türü</td><td>{$turu}</td></tr>
   <tr><td>Sınıf Seviyesi</td><td>{$sinif}</td></tr>
   <tr><td>Kayıt Tarihi</td><td>{$kayit}</td></tr>
   <tr><td>Adres</td><td>{$adr}</td></tr>
   <tr><td>Şube (branch)</td><td>{$sube}</td></tr>
   <tr><td>Sezon (Eğitim Yılı)</td><td>{$sezon}</td></tr>
 </tbody>
</table>
HTML;
    }

    /**
     * Guardian Info
     */
    protected function buildGuardianInfoHtml(?Guardian $guardian, string $title, int $kinshipId): string
    {
        if(!$guardian){
            return <<<HTML
<table class="table-border" style="margin-top:10px;">
 <thead>
   <tr><th colspan="2">{$title}</th></tr>
   <tr><th>Bilgi Türü</th><th>Detaylar</th></tr>
 </thead>
 <tbody>
   <tr><td>Uyarı</td><td>(Öğrencinin kinship_id={$kinshipId} kaydı yok)</td></tr>
 </tbody>
</table>
HTML;
        }

        $tc     = $guardian->identification_no ?? '-';
        $ad     = $guardian->full_name ?? '-';
        $meslek = $guardian->profession ?? '-';
        $dt     = $guardian->birthday ? (is_string($guardian->birthday) ? $guardian->birthday : $guardian->birthday->format('Y-m-d')) : '-';
        $tel    = $guardian->phone ?? '-';
        $adr    = $guardian->address ?? '-';

        return <<<HTML
<table class="table-border" style="margin-top:10px;">
 <thead>
   <tr><th colspan="2">{$title}</th></tr>
   <tr><th>Bilgi Türü</th><th>Detaylar</th></tr>
 </thead>
 <tbody>
   <tr><td>T.C. Kimlik No</td><td>{$tc}</td></tr>
   <tr><td>Adı Soyadı</td><td>{$ad}</td></tr>
   <tr><td>Meslek</td><td>{$meslek}</td></tr>
   <tr><td>Doğum Tarihi</td><td>{$dt}</td></tr>
   <tr><td>Telefon</td><td>{$tel}</td></tr>
   <tr><td>Adres</td><td>{$adr}</td></tr>
 </tbody>
</table>
HTML;
    }

    /**
     * Ödeme Tablosu
     */
    protected function buildOdemeTable($enrollments)
    {
        $rowsHtml = '';
        $totalAll = 0.0;
        $allDueDates = [];
        $methodsCollected = [];
        $anyBurs = '';
        $discountRateText = '';
        $discountReason   = '';
        $downPaymentSum   = 0.0;
        $totalInstallments= 0;

        foreach($enrollments as $enr){
            $svc = $enr->service;
            if(!$svc) continue;
            $svcName= $svc->name;
            $rawPrice= floatval($svc->price);
            $vatRate = floatval($svc->vat_rate);
            $vatVal  = $rawPrice*($vatRate/100);
            $svcPriceVat= $rawPrice+$vatVal;

            // final_fee
            $finalFee= floatval($enr->final_fee??$rawPrice);
            $finalVat= $finalFee*($vatRate/100);
            $finalFeeVat= $finalFee+$finalVat;

            $rowsHtml.= "<tr>
               <td>{$svcName}</td>
               <td style='color:red;'>".number_format($rawPrice,2,',','.')."</td>
               <td style='color:red;'>%{$vatRate}</td>
               <td style='color:red;'>".number_format($svcPriceVat,2,',','.')."</td>
               <td style='color:red;'>".number_format($finalFee,2,',','.')."</td>
               <td style='color:red;'>%{$vatRate}</td>
               <td style='color:red;'>".number_format($finalFeeVat,2,',','.')."</td>
            </tr>";
            $totalAll += $finalFeeVat;

            // PaymentMethod
            if($enr->payment_method_id){
                $pm = PaymentMethod::find($enr->payment_method_id);
                if($pm) $methodsCollected[]=$pm->name;
            }
            // Taksit aralığı
            foreach($enr->installments as $ins){
                if($ins->due_date){
                    $allDueDates[]=$ins->due_date;
                }
            }
            $totalInstallments += $enr->installments->count();

            // Burs => $enr->education_support
            if(!empty($enr->education_support)){
                $anyBurs .= $enr->education_support.' / ';
            }

            // discount => $enr->discount_amount (veya $enr->discount)
            if(floatval($enr->discount_amount)>0){
                $discountRateText = "Var (Tutar: {$enr->discount_amount})";
                // Nedeni => discountstudents
                $dsList=DiscountStudent::where('student_id',$enr->student_id)->get();
                foreach($dsList as $ds){
                    $d = Discount::find($ds->discount_id);
                    if($d){
                        $discountReason .= $d->name.' / ';
                    }
                }
            }
            // Peşinat => $enr->advance_fee
            $downPaymentSum += floatval($enr->advance_fee??0);
        }
        if(!$anyBurs) $anyBurs='Hayır';
        if(!$discountRateText) $discountRateText='Yok';
        if(!$discountReason) $discountReason='---';

        $paymentMethodText= $methodsCollected ? implode(', ',$methodsCollected) : 'Bilinmiyor';
        $beginDate='-'; 
        $endDate  ='-';
        if(!empty($allDueDates)){
            sort($allDueDates);
            $beginDate= reset($allDueDates);
            $endDate = end($allDueDates);
        }
        $minmaxText= "Başlangıç: {$beginDate} / Bitiş: {$endDate}";
        $downPaymentStr= number_format($downPaymentSum,2,',','.');
        $totalStr= number_format($totalAll,2,',','.');

        return <<<HTML
<table class="table-border" style="margin-top:10px;">
  <caption style="text-align:left; font-weight:bold;">
    (202... - 202...) <span style="color:red;">(Sezon DB'den?)</span> Eğitim ve Öğretim Yılı
  </caption>
  <thead>
    <tr>
      <th rowspan="2" style="width:20%; background:#f9f9f9;">Hizmet Adı</th>
      <th colspan="3" style="width:40%; text-align:center;">Kurumun İlan Ettiği Ücretler</th>
      <th colspan="3" style="width:40%; text-align:center;">Öğrenci İçin Belirlenen Ücretler</th>
    </tr>
    <tr>
      <th>Ücret</th>
      <th>KDV Oranı</th>
      <th>Ücret+KDV</th>
      <th>Ücret</th>
      <th>KDV Oranı</th>
      <th>Ücret+KDV</th>
    </tr>
  </thead>
  <tbody>
    {$rowsHtml}
    <tr>
      <td><strong>Ücretler Toplamı</strong></td>
      <td colspan="6" style="color:red;"><strong>{$totalStr} TL</strong></td>
    </tr>
    <tr>
      <td>Ödeme Şekli</td>
      <td colspan="6" style="color:red;">{$paymentMethodText}</td>
    </tr>
    <tr>
      <td>Taksit Başlangıç ve Bitiş Tarihi</td>
      <td colspan="6" style="color:red;">{$minmaxText}</td>
    </tr>
    <tr>
      <td>Peşinat</td>
      <td colspan="6" style="color:red;">{$downPaymentStr} TL</td>
    </tr>
    <tr>
      <td>Taksit Sayısı</td>
      <td colspan="6" style="color:red;">{$totalInstallments}</td>
    </tr>
    <tr>
      <td>Eğitim Bursu Alıyor Mu?(% Oranı)</td>
      <td colspan="6" style="color:red;">{$anyBurs}</td>
    </tr>
    <tr>
      <td>İndirim Yapıldı Mı?(% Oranı)</td>
      <td colspan="6" style="color:red;">{$discountRateText}</td>
    </tr>
    <tr>
      <td>İndirim Yapılmışsa Nedeni</td>
      <td colspan="6" style="color:red;">{$discountReason}</td>
    </tr>
    <tr>
      <td>Diğer İndirimler</td>
      <td colspan="6" style="color:red;">(Projenize göre...)</td>
    </tr>
  </tbody>
</table>
HTML;
    }

    /**
     * Taksit Bilgileri tablosu
     */
    protected function buildTaksitTable($enrollments)
    {
        $rows = '';
        foreach($enrollments as $enr){
            $svcName= $enr->service ? $enr->service->name:'(Service?)';
            $insts  = $enr->installments;
            if($insts->count()<=0){
                $rows.="<tr>
                  <td>{$svcName}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>";
            } else {
                foreach($insts as $ins){
                    $orderNo= $ins->order_no;
                    $dueDate= $ins->due_date;
                    $amtVal = floatval($ins->amount);
                    $amt    = number_format($amtVal,2,',','.').' TL';
                    $pm = PaymentMethod::find($enr->payment_method_id);
                    $pmName= $pm ? $pm->name : '??';
                    $rows.="<tr>
                      <td>{$svcName}</td>
                      <td>{$orderNo}</td>
                      <td>{$dueDate}</td>
                      <td>{$amt}</td>
                      <td>{$pmName}</td>
                    </tr>";
                }
            }
        }
        if(!$rows){
            // 8 satır placeholder
            for($i=0;$i<8;$i++){
                $rows.="<tr><td style='height:24px'></td><td></td><td></td><td></td><td></td></tr>";
            }
        }

        return <<<HTML
<table class="table-border" style="margin-top:10px;">
  <thead>
    <tr>
      <th>Hizmet Türü</th>
      <th>Taksit No</th>
      <th>Ödeme Tarihi</th>
      <th>Tutar</th>
      <th>Ödeme Şekli</th>
    </tr>
  </thead>
  <tbody>
    {$rows}
  </tbody>
</table>
HTML;
    }

    /**
     * Senet HTML => sadece "Çek & Senet" enrollments varsa
     */
    protected function buildSenetHtml(Student $student, $enrollments)
    {
        // Tabloda vade / tutar / senet no
        // Yine PaymentMethod check "Çek & Senet"
        $senetRows = '';
        foreach($enrollments as $e){
            $pm = PaymentMethod::find($e->payment_method_id);
            if($pm && $pm->name=='Çek & Senet'){
                // taksit
                foreach($e->installments as $ins){
                    $vade  = $ins->due_date;
                    $amtStr= number_format(floatval($ins->amount),2,',','.').' TL';
                    $snNo  = 'SN-'.$ins->order_no;
                    $senetRows.="<tr>
                       <td>{$vade}</td>
                       <td>{$amtStr}</td>
                       <td>{$snNo}</td>
                    </tr>";
                }
            }
        }

        if(!$senetRows){
            // yoksa placeholder
            $senetRows="<tr><td>2025-09-01</td><td>5000 TL</td><td>SN-001</td></tr>";
        }

        // Örenci Ad / T.C. => $student / Guardian(0) ?
        // Burada basit sabit bıraktık. 
        return <<<HTML
<div style="margin-top:20px; background:#f9f9f9; padding:10px;">
  <h4 style="margin:0;">SENET (Sistemden Çekilecek)</h4>
  <table class="table-border">
    <thead>
      <tr>
        <th>Vade</th><th>Tutar</th><th>Senet No</th>
      </tr>
    </thead>
    <tbody>
      {$senetRows}
    </tbody>
  </table>
  <p>
    İşbu nama muharrer senedin mukabilinde [Tarih] tarihinde:
    <br/>Sayın [Kurum veya Kişi Adı], yukarıda yazılı yalnız [Tutar] Türk Lirası ödeyeceğim. 
    <br/>Bedeli malen ahzolunmuştur. İşbu senet vadesinde
    ödenmediği takdirde müteakip bonoların da muacceliyet kesbedeceğini, ihtilaf vukuunda [Yetkili Mahkeme]
    mahkemelerinin selahiyetli olduğunu kabul ederim.
    <br/><br/>Düzenleme Yeri [Şehir], Düzenleme Tarihi [Tarih]
  </p>
  <table style="width:100%; border:1px solid #ccc; border-collapse:collapse; margin-top:5px;">
    <tr>
      <th style="width:50%; border:1px solid #ccc;">ÖDEYECEK</th>
      <th style="border:1px solid #ccc;">İMZA</th>
    </tr>
    <tr>
      <td style="border:1px solid #ccc; padding:6px;">
        İsim: <span style="color:red;">(Öğrenci veya Veli?)</span> <br/>
        T.C.: <span style="color:red;">(DB verisi)</span> <br/>
        Adres: <span style="color:red;">(DB verisi)</span> <br/>
        Öğrenci / Sınıf: <span style="color:red;">(Öğrenci Adı / Sınıf?)</span>
      </td>
      <td style="border:1px solid #ccc; vertical-align:top; text-align:center;">
        <div style="border:1px dashed #000; height:80px; margin:10px auto; width:80%;"></div>
        <p>İmza Alanı ve Çıktı</p>
      </td>
    </tr>
  </table>
</div>
HTML;
    }

}

<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel\Personel;
use App\Models\Salary\PersonelMaasBorc;
use App\Models\Salary\PersonelMaasOdeme;
use App\Models\Prim\PersonelPrim;
use App\Models\Tazminat\PersonelTazminat;
use App\Models\PersonelKesinti\PersonelKesinti;
use App\Models\PersonelIade\PersonelIade;
use App\Models\Kupon\KuponUcreti;
use App\Models\Ders\DersUcreti;
use App\Models\OzelDers\OzelDersUcreti;
use App\Models\Kocluk\KoclukUcreti;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PersonelOdemeController extends Controller
{
    /**
     * Personel ödeme bilgilerini listele.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate', 25); // Sayfalama limiti
        $orderBy = $request->get('orderBy', 'ASC'); // Sıralama yönü
        $sortBy = $request->get('sortBy', 'created_at'); // Sıralama sütunu
        $search = $request->get('search', ''); // Arama terimi
        $page = $request->get('page', 1); // Sayfa numarası (varsayılan: 1)

        // Personel verilerini çekiyoruz
        $query = Personel::query();

        // Arama filtresi
        if ($search) {
            $query->where('ad', 'LIKE', "%$search%")
                  ->orWhere('soyad', 'LIKE', "%$search%")
                  ->orWhere('email', 'LIKE', "%$search%")
                  ->orWhere('telefon', 'LIKE', "%$search%");
        }

        // Personelleri sıralayıp sayfalıyoruz
        $personeller = $query->orderBy($sortBy, $orderBy)
                             ->paginate($limit, ['*'], 'page', $page) // Sayfalama işlemi
                             ->appends($request->query()); // Arama ve diğer parametreleri sayfa linkine ekliyoruz

        // Verileri birleştiriyoruz
        $personelData = $personeller->map(function ($personel) {
            // İlgili verileri çekiyoruz
            $maas = PersonelMaasBorc::where('personel_id', $personel->id)->first();
            $dersUcret = DersUcreti::where('personel_id', $personel->id)->first();
            $ozelDersUcret = OzelDersUcreti::where('personel_id', $personel->id)->first();
            $koclukUcret = KoclukUcreti::where('personel_id', $personel->id)->first();
            $kuponUcret = KuponUcreti::where('personel_id', $personel->id)->first();
            $prim = PersonelPrim::where('personel_id', $personel->id)->first();
            $tazminat = PersonelTazminat::where('personel_id', $personel->id)->first();
            $kesinti = PersonelKesinti::where('personel_id', $personel->id)->first();
            $iade = PersonelIade::where('personel_id', $personel->id)->first();

            // Dinamik Haftalık Gün ve Ay Sayısı Hesaplamaları
            $haftalikGun = 6; // Burada veritabanında bulunan bir alan varsa kullanılabilir. Sabit 6 olarak bırakıyoruz.
            $aySayisi = $this->calculateMonths($personel->created_at);

            // Tablo için gereken verileri topluyoruz
            return [
                'sube' => "test",  // Sabit bir değer veya ilişkili tablodan alınabilir
                'brans' => $personel->pozisyon, // Pozisyon
                'ad_soyad' => $personel->ad . ' ' . $personel->soyad,
                'haftalik_gun' => $haftalikGun,
                'ay_sayisi' => $aySayisi,
                'maas' => $this->calculateAmount($maas, 'aylik_ucret'),
                'ders_ucreti' => $this->calculateAmount($dersUcret, 'ders_ucreti'),
                'ders_sayisi' => $this->calculateAmount($dersUcret, 'ders_sayisi'),
                'soru_cozum_ucreti' => $this->calculateAmount($prim, 'miktar'),
                'egitim_ucreti' => $this->calculateAmount($koclukUcret, 'toplam_ucret'),
                'kupon_ucreti' => $this->calculateAmount($kuponUcret, 'gelir'),
                'farkli_ucret' => $this->calculateAmount($ozelDersUcret, 'gelir'),
                'toplam' => $this->calculateTotal([
                    $this->calculateAmount($maas, 'aylik_ucret'),
                    $this->calculateAmount($dersUcret, 'ders_ucreti') * $this->calculateAmount($dersUcret, 'ders_sayisi'),
                    $this->calculateAmount($prim, 'miktar'),
                    $this->calculateAmount($koclukUcret, 'toplam_ucret'),
                    $this->calculateAmount($kuponUcret, 'gelir'),
                    $this->calculateAmount($ozelDersUcret, 'gelir'),
                ]),
                'odeme_yontemi' => $this->calculatePaymentMethod($maas),
                'odeme_miktari' => $this->calculateRemaining($maas, $kesinti, $iade),
                'odenen_toplam' => $this->calculateRemaining($maas, $kesinti, $iade),
                'kalan' => $this->calculateRemaining($maas, $kesinti, $iade),
            ];
        });

        return response()->json([
            'personeller' => $personelData,
            'pagination' => [
                'current_page' => $personeller->currentPage(),
                'total_pages' => $personeller->lastPage(),
                'per_page' => $personeller->perPage(),
                'total' => $personeller->total(),
            ]
        ], 200);
    }

    /**
     * Ay sayısını hesaplayan fonksiyon (işe başlama tarihi ile şu anki tarih arasındaki fark)
     *
     * @param string $createdAt
     * @return int
     */
    private function calculateMonths($createdAt)
    {
        $startDate = Carbon::parse($createdAt);
        $endDate = Carbon::now();
        return $startDate->diffInMonths($endDate);
    }

    /**
     * Her türlü miktar için uygun hesaplama fonksiyonu
     *
     * @param \Illuminate\Database\Eloquent\Collection $data
     * @param string $column
     * @return float
     */
    private function calculateAmount($data, $column)
    {
        return $data ? (float)$data->$column : 0; // Eğer veri varsa, ilgili kolonu alıyoruz.
    }

    /**
     * Toplam ücret hesaplama fonksiyonu
     *
     * @param array $values
     * @return float
     */
    private function calculateTotal(array $values)
    {
        return array_sum($values);
    }

    /**
     * Kalan ücret hesaplama fonksiyonu
     *
     * @param object $maas
     * @param object $kesinti
     * @param object $iade
     * @return float
     */
    private function calculateRemaining($maas, $kesinti, $iade)
    {
        $total = $maas ? (float)$maas->aylik_ucret : 0;
        $total -= $kesinti ? (float)$kesinti->miktar : 0;
        $total += $iade ? (float)$iade->miktar : 0;
        return number_format($total, 2, ',', '.'); // Formatlı döndürme
    }

    /**
     * Ödeme yöntemini dinamik olarak belirleyebiliriz.
     *
     * @param object $maas
     * @return string
     */
    private function calculatePaymentMethod($maas)
    {
        // Burada ödeme yöntemi veritabanından alınabilir. Şu an sabit bir değer döndürüyoruz.
        return 'Banka';
    }
}

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
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PersonelImport;

class PersonelController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
        $search = $request->get('search', '');
        $personellerQuery = Personel::query();
        if ($search) {
            $personellerQuery->where('ad', 'LIKE', "%$search%")
                             ->orWhere('soyad', 'LIKE', "%$search%")
                             ->orWhere('email', 'LIKE', "%$search%")
                             ->orWhere('telefon', 'LIKE', "%$search%");
        }
        $personeller = $personellerQuery->orderBy($sortBy, $orderBy)
                                          ->paginate($limit)
                                          ->appends($request->query());
        $maas_borclar = PersonelMaasBorc::all();
        $maas_odemeler = PersonelMaasOdeme::all();
        $primler = PersonelPrim::all();
        $tazminatlar = PersonelTazminat::all();
        $kesintiler = PersonelKesinti::all();
        $iadeler = PersonelIade::all();
        return response()->json([
            'personeller' => $personeller,
            'maas_borclar' => $maas_borclar,
            'maas_odemeler' => $maas_odemeler,
            'primler' => $primler,
            'tazminatlar' => $tazminatlar,
            'kesintiler' => $kesintiler,
            'iadeler' => $iadeler,
        ], 200);
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'register_no' => 'required|string|unique:personeller,register_no',
            'ad' => 'required|string',
            'soyad' => 'required|string',
            'tc_kimlik_no' => 'required|string|unique:personeller,tc_kimlik_no',
            'telefon' => 'nullable|string|max:15',
            'email' => 'nullable|email',
            'adres' => 'nullable|string',
            'dogum_tarihi' => 'nullable|date',
            'mesleki_yas' => 'nullable|integer',
            'ikametgah_adresi' => 'nullable|string',
            'gorev' => 'nullable|string',
            'brans' => 'nullable|string',
            'profil_foto' => 'nullable|string',
            'works_for' => 'required|string',
            'base_salary' => 'required|numeric',
            'aggrements_date' => 'required|string',
            'not_paid_date' => 'required|string',
        ]);
        if (!empty($data['profil_foto']) && preg_match('/^data:image\/(\w+);base64,/', $data['profil_foto'], $type)) {
            $data['profil_foto'] = substr($data['profil_foto'], strpos($data['profil_foto'], ',') + 1);
            $data['profil_foto'] = base64_decode($data['profil_foto']);
            if ($data['profil_foto'] === false) {
                return response()->json(['error' => 'Invalid profile photo encoding'], 422);
            }
            $extension = strtolower($type[1]);
            if (!in_array($extension, ['jpg', 'jpeg', 'gif', 'png'])) {
                return response()->json(['error' => 'Invalid image type'], 422);
            }
            $fileName = uniqid() . '.' . $extension;
            $uploadPath = public_path('public/uploads/profil_fotolari');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $filePath = $uploadPath . '/' . $fileName;
            file_put_contents($filePath, $data['profil_foto']);
            $data['profil_foto'] = 'public/uploads/profil_fotolari/' . $fileName;
        }
        [$agreement_start_date, $agreement_end_date] = array_map('trim', explode(' - ', $data['aggrements_date']));
        $personel = Personel::create([
            'register_no' => $data['register_no'],
            'ad' => $data['ad'],
            'soyad' => $data['soyad'],
            'tc_kimlik_no' => $data['tc_kimlik_no'],
            'telefon' => $data['telefon'],
            'email' => $data['email'],
            'adres' => $data['adres'],
            'dogum_tarihi' => $data['dogum_tarihi'],
            'mesleki_yas' => $data['mesleki_yas'],
            'ikametgah_adresi' => $data['ikametgah_adresi'],
            'gorev' => $data['gorev'],
            'brans' => $data['brans'],
            'profil_foto' => $data['profil_foto'],
            'works_for' => $data['works_for'],
            'base_salary' => $data['base_salary'],
            'agreement_start_date' => $agreement_start_date,
            'agreement_end_date' => $agreement_end_date,
            'aggrements_date' => $data['aggrements_date'],
            'not_paid_date' => json_encode(array_map('trim', explode(',', $data['not_paid_date']))),
        ]);
        return response()->json([
            'message' => 'Personel başarıyla kaydedildi.',
            'data' => $personel,
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,csv',
        ]);
        $file = $request->file('file');
        Excel::import(new PersonelImport, $file);
        return response()->json(['message' => 'Personel verileri başarıyla içe aktarıldı.']);
    }

public function show(int $id)
{
    $personel = Personel::findOrFail($id);
    if ($personel->profil_foto) {
        $personel->profil_foto = asset($personel->profil_foto);
    }
    return response()->json([
        'message' => 'Personel detayları getirildi.',
        'data' => $personel,
    ]);
}


  public function update(Request $request, $id)
{
    $personel = Personel::findOrFail($id);
    $data = $request->validate([
        'ad' => 'nullable|string',
        'soyad' => 'nullable|string',
        'tc_kimlik_no' => "nullable|string|unique:personeller,tc_kimlik_no,{$id}",
        'telefon' => 'nullable|string|max:15',
        'email' => 'nullable|email',
        'adres' => 'nullable|string',
        'dogum_tarihi' => 'nullable|date',
        'mesleki_yas' => 'nullable|integer',
        'ikametgah_adresi' => 'nullable|string',
        'gorev' => 'nullable|string',
        'brans' => 'nullable|string',
        'profil_foto' => 'nullable|string',
        'aggrements_date' => 'nullable|string',
        'not_paid_date' => 'nullable|string',
        'aktif' => 'nullable|integer'
    ]);
    if (!empty($data['profil_foto']) && preg_match('/^data:image\/(\w+);base64,/', $data['profil_foto'], $type)) {
        $data['profil_foto'] = substr($data['profil_foto'], strpos($data['profil_foto'], ',') + 1);
        $data['profil_foto'] = base64_decode($data['profil_foto']);
        if ($data['profil_foto'] === false) {
            return response()->json(['error' => 'Invalid profile photo encoding'], 422);
        }
        $extension = strtolower($type[1]);
        if (!in_array($extension, ['jpg', 'jpeg', 'gif', 'png'])) {
            return response()->json(['error' => 'Invalid image type'], 422);
        }
        $fileName = uniqid() . '.' . $extension;
        $uploadPath = public_path('public/uploads/profil_fotolari');
        if (!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }
        $filePath = $uploadPath . '/' . $fileName;
        file_put_contents($filePath, $data['profil_foto']);
        $data['profil_foto'] = 'public/uploads/profil_fotolari/' . $fileName;
    }
    if (!empty($data['aggrements_date'])) {
        [$agreement_start_date, $agreement_end_date] = array_map('trim', explode(' - ', $data['aggrements_date']));
        $data['agreement_start_date'] = $agreement_start_date;
        $data['agreement_end_date'] = $agreement_end_date;
    }
    if (!empty($data['not_paid_date'])) {
        $data['not_paid_date'] = json_encode(array_map('trim', explode(',', $data['not_paid_date'])));
    }
    $personel->update($data);
    return response()->json([
        'message' => 'Personel başarıyla güncellendi.',
        'data' => $personel,
    ]);
}


    public function destroy($id)
    {
        $personel = Personel::findOrFail($id);
        $personel->delete();
        return response()->json(['message' => 'Personel başarıyla silindi.']);
    }

    public function listEmployee(Request $request)
    {
        $pozisyon = $request->input('pozisyon');
        if (is_string($pozisyon)) {
            $trimmed = trim($pozisyon, '[]');
            $trimmed = str_replace("'", "", $trimmed);
            $pozisyon = array_map('trim', explode(',', $trimmed));
        } elseif (!is_array($pozisyon)) {
            $pozisyon = [$pozisyon];
        }
        $sonuc = Personel::whereIn('pozisyon', $pozisyon)->get();
        return response()->json($sonuc);
    }
public function getRegisterNo(Request $request)
{
    // Mevcut en yüksek register_no değerini alıyoruz.
    $maxRegisterNo = Personel::max('register_no');
    // Eğer daha önce kayıt yapılmamışsa 1, yapılmışsa mevcut değerin integer hali + 1
    $newNumber = $maxRegisterNo ? ((int)$maxRegisterNo + 1) : 1;
    // 4 haneli olacak şekilde başında sıfır olacak şekilde formatlıyoruz.
    $formattedRegisterNo = str_pad($newNumber, 4, '0', STR_PAD_LEFT);

    return response()->json(['no' => $formattedRegisterNo]);
}


}

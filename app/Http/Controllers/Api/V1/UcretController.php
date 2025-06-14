<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel\Personel;
use App\Models\Ders\DersUcreti;
use App\Models\Kocluk\KoclukUcreti;
use App\Models\Kupon\KuponUcreti;
use App\Models\OzelDers\OzelDersUcreti;
use Illuminate\Http\Request;

class UcretController extends Controller
{
    public function hesaplaDersUcreti(Request $request, $personelId)
    {
        $data = $request->validate([
            'ders_sayisi' => 'required|integer',
            'ders_ucreti' => 'required|numeric'
        ]);

        $data['personel_id'] = $personelId;
        $data['toplam_ucret'] = $data['ders_sayisi'] * $data['ders_ucreti'];

        $dersUcreti = DersUcreti::create($data);

        return response()->json(['message' => 'Ders ücreti hesaplandı.', 'data' => $dersUcreti]);
    }

    public function hesaplaKoclukUcreti(Request $request, $personelId)
    {
        $data = $request->validate([
            'ogrenci_adi' => 'required|string',
            'ucret' => 'required|numeric',
            'ogrenci_yuzdesi' => 'required|numeric',
        ]);

        $data['personel_id'] = $personelId;
        $data['gelir'] = $data['ucret'] * ($data['ogrenci_yuzdesi'] / 100);

        $koclukUcreti = KoclukUcreti::create($data);

        return response()->json(['message' => 'Koçluk ücreti hesaplandı.', 'data' => $koclukUcreti]);
    }

    public function hesaplaKuponUcreti(Request $request, $personelId)
    {
        $data = $request->validate([
            'urun_turu' => 'required|string',
            'urun_adi' => 'required|string',
            'satis_ucreti' => 'required|numeric',
            'kupon_yuzdesi' => 'required|numeric',
        ]);

        $data['personel_id'] = $personelId;
        $data['gelir'] = $data['satis_ucreti'] * ($data['kupon_yuzdesi'] / 100);

        $kuponUcreti = KuponUcreti::create($data);

        return response()->json(['message' => 'Kupon ücreti hesaplandı.', 'data' => $kuponUcreti]);
    }

    public function hesaplaOzelDersUcreti(Request $request, $personelId)
    {
        $data = $request->validate([
            'ogrenci_adi' => 'required|string',
            'baslangic_saati' => 'required|date_format:H:i',
            'bitis_saati' => 'required|date_format:H:i',
            'ders_ucreti' => 'required|numeric',
            'ogrenci_yuzdesi' => 'required|numeric',
        ]);

        $data['personel_id'] = $personelId;
        $data['gelir'] = $data['ders_ucreti'] * ($data['ogrenci_yuzdesi'] / 100);

        $ozelDersUcreti = OzelDersUcreti::create($data);

        return response()->json(['message' => 'Özel ders ücreti hesaplandı.', 'data' => $ozelDersUcreti]);
    }
}

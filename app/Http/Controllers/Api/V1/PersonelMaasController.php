<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Personel\Personel;
use App\Models\Personel\PersonelMaasBorc;
use App\Models\Personel\PersonelMaasOdeme;

class PersonelMaasController extends Controller
{
    /**
     * Tüm borç ve ödeme kayıtlarını listele.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
        $search = $request->get('search', '');

        $query = \App\Models\Salary\PersonelMaasBorc::query();

        // Arama filtresi
        if ($search) {
            $query->where('aylik_ucret', 'LIKE', "%$search%")
                  ->orWhere('odeme_sekli', 'LIKE', "%$search%");
        }

        $borclar = $query->orderBy($sortBy, $orderBy)
                         ->paginate($limit)
                         ->appends($request->query());

        return response()->json($borclar, 200);
    }
public function indexBorc(Request $request)
{
    $personelId = $request->get('personel_id');

    if (!$personelId) {
        return response()->json([
            'message' => 'personel_id parametresi gerekli.',
        ], 400);
    }

    $borclar = \App\Models\Salary\PersonelMaasBorc::where('personel_id', $personelId)->get();

    return response()->json([
        'data' => $borclar,
    ], 200);
}
    /**
     * Yeni borç kaydı oluştur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeBorc(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'aylik_ucret' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'maas_sayisi' => 'required|integer',
            'baslangic_tarihi' => 'required|date',
        ]);

        $borc = \App\Models\Salary\PersonelMaasBorc::create($data);

        return response()->json(['message' => 'Borç kaydı başarıyla oluşturuldu.', 'data' => $borc], 201);
    }

    /**
     * Belirli bir borç kaydını göster.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showBorc($id)
    {
        $borc = \App\Models\Salary\PersonelMaasBorc::where('personel_id','=',$id)->get();

        return response()->json(['data' => $borc], 200);
    }

    /**
     * Borç kaydını güncelle.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateBorc(Request $request, $id)
    {
        $data = $request->validate([
            'aylik_ucret' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'maas_sayisi' => 'required|integer',
            'baslangic_tarihi' => 'required|date',
        ]);

        $borc = \App\Models\Salary\PersonelMaasBorc::findOrFail($id);
        $borc->update($data);

        return response()->json(['message' => 'Borç kaydı başarıyla güncellendi.', 'data' => $borc], 200);
    }

    /**
     * Borç kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteBorc($id)
    {
        $borc = \App\Models\Salary\PersonelMaasBorc::findOrFail($id);
        $borc->delete();

        return response()->json(['message' => 'Borç kaydı başarıyla silindi.'], 200);
    }

    /**
     * Yeni ödeme kaydı oluştur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOdeme(Request $request)
    {
        $data = $request->validate([
            'borc_id' => 'required|exists:personel_maas_borc,id',
            'miktar' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'aciklama' => 'nullable|string',
            'personel_id' => 'required'
             
        ]);

        $odeme = \App\Models\Salary\PersonelMaasOdeme::create($data);

        return response()->json(['message' => 'Ödeme kaydı başarıyla oluşturuldu.', 'data' => $odeme], 201);
    }

    /**
     * Belirli bir ödeme kaydını göster.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function showOdeme($id)
    {
        $odeme = \App\Models\Salary\PersonelMaasOdeme::where('personel_id','=',$id)->get();

        return response()->json(['data' => $odeme], 200);
    }

    /**
     * Ödeme kaydını güncelle.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOdeme(Request $request, $id)
    {
        $data = $request->validate([
            'miktar' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'aciklama' => 'nullable|string',
            
        ]);

        $odeme = \App\Models\Salary\PersonelMaasOdeme::findOrFail($id);
        $odeme->update($data);

        return response()->json(['message' => 'Ödeme kaydı başarıyla güncellendi.', 'data' => $odeme], 200);
    }

    /**
     * Ödeme kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteOdeme($id)
    {
        $odeme = \App\Models\Salary\PersonelMaasOdeme::findOrFail($id);
        $odeme->delete();

        return response()->json(['message' => 'Ödeme kaydı başarıyla silindi.'], 200);
    }
}

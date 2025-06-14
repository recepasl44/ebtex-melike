<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel;
use App\Models\Tazminat\PersonelTazminat;
use Illuminate\Http\Request;

class PersonelTazminatController extends Controller
{
    /**
     * Tüm Tazminatları Listele
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Parametreleri al
        $limit = $request->get('paginate', 25); // Sayfalama limiti
        $orderBy = $request->get('orderBy', 'ASC'); // Sıralama yönü
        $sortBy = $request->get('sortBy', 'created_at'); // Sıralama sütunu
        $search = $request->get('search', ''); // Arama terimi
    
        // Query oluştur
        $query = PersonelTazminat::with('personel');
    
        // Arama filtresi
        if ($search) {
            $query->whereHas('personel', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                  ->orWhere('surname', 'LIKE', "%$search%");
            })->orWhere('tazminat_turu', 'LIKE', "%$search%")
              ->orWhere('aciklama', 'LIKE', "%$search%");
        }
    
        // Sıralama ve sayfalama
        $tazminatlar = $query->orderBy($sortBy, $orderBy)->paginate($limit)->appends($request->query());
    
        // JSON yanıt döndür
        return response()->json($tazminatlar, 200);
    }
    

    /**
     * Yeni Tazminat Oluştur
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'tazminat_turu' => 'required|in:İhbar Tazminatı,Kıdem Tazminatı',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'miktar' => 'required|numeric',
            'banka_hesap_adi' => 'nullable|string',
            'aciklama' => 'nullable|string',
        ]);

        $tazminat = PersonelTazminat::create($data);

        return response()->json(['message' => 'Tazminat başarıyla oluşturuldu.', 'data' => $tazminat], 201);
    }

    /**
     * Belirli Bir Tazminat Getir
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $tazminat = PersonelTazminat::with('personel')->where('personel_id','=',$id)->get();

        if (!$tazminat) {
            return response()->json(['message' => 'Tazminat bulunamadı.'], 404);
        }

        return response()->json(['data' => $tazminat], 200);
    }

    /**
     * Tazminat Güncelle
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tazminat_turu' => 'required|in:İhbar Tazminatı,Kıdem Tazminatı',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'miktar' => 'required|numeric',
            'banka_hesap_adi' => 'nullable|string',
            'aciklama' => 'nullable|string',
        ]);

        $tazminat = PersonelTazminat::find($id);

        if (!$tazminat) {
            return response()->json(['message' => 'Tazminat bulunamadı.'], 404);
        }

        $tazminat->update($data);

        return response()->json(['message' => 'Tazminat başarıyla güncellendi.', 'data' => $tazminat], 200);
    }

    /**
     * Tazminat Sil
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $tazminat = PersonelTazminat::find($id);

        if (!$tazminat) {
            return response()->json(['message' => 'Tazminat bulunamadı.'], 404);
        }

        $tazminat->delete();

        return response()->json(['message' => 'Tazminat başarıyla silindi.'], 200);
    }
}

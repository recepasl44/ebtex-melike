<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel\Personel;
use App\Models\PersonelIade\PersonelIade;
use Illuminate\Http\Request;

class PersonelIadeController extends Controller
{
    /**
     * İadeleri listele.
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

        $query = PersonelIade::with('personel');

        // Arama filtresi
        if ($search) {
            $query->where('miktar', 'LIKE', "%$search%")
                  ->orWhere('aciklama', 'LIKE', "%$search%")
                  ->orWhereHas('personel', function ($q) use ($search) {
                      $q->where('ad_soyad', 'LIKE', "%$search%");
                  });
        }

        $iades = $query->orderBy($sortBy, $orderBy)
                       ->paginate($limit)
                       ->appends($request->query());

        return response()->json($iades, 200);
    }

    /**
     * Yeni iade kaydı oluştur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'tarih' => 'required|date',
            'miktar' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'banka_hesap_adi' => 'nullable|string',
            'gonderen_ad_soyad' => 'nullable|string',
            'aciklama' => 'nullable|string',
        ]);

        $iade = PersonelIade::create($data);

        return response()->json(['message' => 'İade başarıyla oluşturuldu.', 'data' => $iade], 201);
    }

    /**
     * Belirli bir iade kaydını görüntüle.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $iade = PersonelIade::with('personel')->where('personel_id','=',$id)->get();

        return response()->json(['data' => $iade], 200);
    }

    /**
     * İade kaydını güncelle.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'tarih' => 'required|date',
            'miktar' => 'required|numeric',
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'banka_hesap_adi' => 'nullable|string',
            'gonderen_ad_soyad' => 'nullable|string',
            'aciklama' => 'nullable|string',
        ]);

        $iade = PersonelIade::findOrFail($id);
        $iade->update($data);

        return response()->json(['message' => 'İade başarıyla güncellendi.', 'data' => $iade], 200);
    }

    /**
     * İade kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $iade = PersonelIade::findOrFail($id);
        $iade->delete();

        return response()->json(['message' => 'İade başarıyla silindi.'], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel\Personel;
use App\Models\Personel\PersonelPrim;
use App\Models\Personel\PersonelPrimOdeme;
use Illuminate\Http\Request;

class PersonelPrimController extends Controller
{
    /**
     * Tüm primleri listele.
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

        $query = \App\Models\Prim\PersonelPrim::query();

        // Arama filtresi
        if ($search) {
            $query->where('miktar', 'LIKE', "%$search%")
                  ->orWhere('aciklama', 'LIKE', "%$search%");
        }

        $primler = $query->orderBy($sortBy, $orderBy)
                         ->paginate($limit)
                         ->appends($request->query());

        return response()->json($primler, 200);
    }

    /**
     * Yeni prim kaydı oluştur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'vade' => 'required|date',
            'miktar' => 'required|numeric',
            'aciklama' => 'nullable|string',
        ]);

        $prim = \App\Models\Prim\PersonelPrim::create($data);

        return response()->json(['message' => 'Prim başarıyla oluşturuldu.', 'data' => $prim], 201);
    }

    /**
     * Belirli bir prim kaydını görüntüle.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($personel_id)
    {
        $prim = \App\Models\Prim\PersonelPrim::where('personel_id','=',$personel_id)->get();

        return response()->json(['data' => $prim], 200);
    }

    /**
     * Prim kaydını güncelle.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'vade' => 'required|date',
            'miktar' => 'required|numeric',
            'aciklama' => 'nullable|string',
        ]);

        $prim = \App\Models\Prim\PersonelPrim::findOrFail($id);
        $prim->update($data);

        return response()->json(['message' => 'Prim başarıyla güncellendi.', 'data' => $prim], 200);
    }

    /**
     * Prim kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $prim = \App\Models\Prim\PersonelPrim::findOrFail($id);
        $prim->delete();

        return response()->json(['message' => 'Prim başarıyla silindi.'], 200);
    }

    /**
     * Belirli bir prime ödeme kaydı oluştur.
     *
     * @param Request $request
     * @param int $primId
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOdeme(Request $request, $primId)
    {
        $data = $request->validate([
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'banka' => 'nullable|string',
        ]);

        $data['prim_id'] = $primId;

        $odeme = \App\Models\Prim\PersonelPrimOdeme::create($data);

        return response()->json(['message' => 'Ödeme başarıyla oluşturuldu.', 'data' => $odeme], 201);
    }

    /**
     * Belirli bir ödeme kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteOdeme($id)
    {
        $odeme = \App\Models\Prim\PersonelPrimOdeme::findOrFail($id);
        $odeme->delete();

        return response()->json(['message' => 'Ödeme başarıyla silindi.'], 200);
    }
}

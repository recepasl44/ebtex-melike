<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Personel\Personel;
use App\Models\PersonelKesinti\PersonelKesinti;
use Illuminate\Http\Request;

class PersonelKesintiController extends Controller
{
    /**
     * Summary of index
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate' ,25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
        $search = $request->get('search', '');
       
    
        $query = PersonelKesinti::with('personel');

        // Arama filtresi
        if ($search) {
            $query->where('miktar', 'LIKE', "%$search%")
                  ->orWhere('aciklama', 'LIKE', "%$search%")
                  ->orWhereHas('personel', function ($q) use ($search) {
                      $q->where('ad_soyad', 'LIKE', "%$search%");
                  });
        }

        $kesintiler = $query->orderBy($sortBy, $orderBy)
                            ->paginate($limit)
                            ->appends($request->query());

        return response()->json($kesintiler, 200);
    }

    /**
     * Yeni kesinti kaydı oluştur.
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
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'banka_hesap_adi' => 'nullable|string',
        ]);

        $kesinti = PersonelKesinti::create($data);

        return response()->json(['message' => 'Kesinti başarıyla oluşturuldu.', 'data' => $kesinti], 201);
    }

    /**
     * Belirli bir kesinti kaydını görüntüle.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $kesinti = PersonelKesinti::with('personel')->where('personel_id','=',$id)->get();

        return response()->json(['data' => $kesinti], 200);
    }

    /**
     * Kesinti kaydını güncelle.
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
            'odeme_sekli' => 'required|in:Nakit,Banka',
            'banka_hesap_adi' => 'nullable|string',
        ]);

        $kesinti = PersonelKesinti::findOrFail($id);
        $kesinti->update($data);

        return response()->json(['message' => 'Kesinti başarıyla güncellendi.', 'data' => $kesinti], 200);
    }

    /**
     * Kesinti kaydını sil.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $kesinti = PersonelKesinti::findOrFail($id);
        $kesinti->delete();

        return response()->json(['message' => 'Kesinti başarıyla silindi.'], 200);
    }

    /**
     * Belirli bir kesinti tahsilatı oluştur.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function tahsilatStore(Request $request, $id)
    {
        $data = $request->validate([
            'tahsilat_sekli' => 'required|in:Nakit,Banka',
            'banka' => 'nullable|string',
            'gonderen_ad_soyad' => 'nullable|string',
        ]);

        $kesinti = PersonelKesinti::findOrFail($id);

        $kesinti->alınan = $kesinti->miktar;
        $kesinti->vade = now();
        $kesinti->odeme_sekli = $data['tahsilat_sekli'];
        $kesinti->banka_hesap_adi = $data['banka'];
        $kesinti->gonderen_ad_soyad = $data['gonderen_ad_soyad'];
        $kesinti->save();

        return response()->json(['message' => 'Kesinti tahsilatı başarıyla yapıldı.', 'data' => $kesinti], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Kocluk\KoclukUcreti;
use Illuminate\Http\Request;

class KoclukUcretiController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->get('paginate', 10);
        $search   = $request->get('search', '');
        $orderBy  = $request->get('orderBy', 'ASC');
        $sortBy   = $request->get('sortBy', 'created_at');

        $query = KoclukUcreti::query();

        if ($search) {
            // Example: filter by ad_soyad or tarih
            $query->where('ad_soyad', 'LIKE', "%{$search}%")
                  ->orWhere('tarih', 'LIKE', "%{$search}%");
        }

        $data = $query->orderBy($sortBy, $orderBy)->paginate($paginate);

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id'      => 'required|exists:personeller,id',
            'tarih'            => 'required|date',
            'baslangic_saati'  => 'required|string',
            'bitis_saati'      => 'required|string',
            'ad_soyad'         => 'required|string',
            'ucret'            => 'required|numeric|min:0',
            'kar_yuzdesi'      => 'required|numeric|min:0',
        ]);

        // Calculate gelir
        $data['gelir'] = $data['ucret'] + ($data['ucret'] * $data['kar_yuzdesi'] / 100);

        $record = KoclukUcreti::create($data);

        return response()->json([
            'message' => 'Koçluk ücreti başarıyla oluşturuldu.',
            'data'    => $record
        ], 201);
    }

    public function show($id)
    {
        // e.g. GET /kocluk-ucretleri/{personel_id}
        $records = KoclukUcreti::where('personel_id', $id)->get();

        return response()->json(['data' => $records], 200);
    }

    public function update(Request $request, $id)
    {
        $record = KoclukUcreti::findOrFail($id);

        $data = $request->validate([
            'tarih'           => 'required|date',
            'baslangic_saati' => 'required|string',
            'bitis_saati'     => 'required|string',
            'ad_soyad'        => 'required|string',
            'ucret'           => 'required|numeric|min:0',
            'kar_yuzdesi'     => 'required|numeric|min:0',
        ]);

        $data['gelir'] = $data['ucret'] + ($data['ucret'] * $data['kar_yuzdesi'] / 100);

        $record->update($data);

        return response()->json([
            'message' => 'Koçluk ücreti başarıyla güncellendi.',
            'data'    => $record
        ], 200);
    }

    public function destroy($id)
    {
        $record = KoclukUcreti::findOrFail($id);
        $record->delete();

        return response()->json([
            'message' => 'Koçluk ücreti başarıyla silindi.'
        ], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\OzelDers\OzelDersUcreti;
use App\Services\UcretHesaplamaService;
use Illuminate\Http\Request;

class OzelDersUcretiController extends Controller
{
    protected $ucretHesaplamaService;

    public function __construct(UcretHesaplamaService $ucretHesaplamaService)
    {
        $this->ucretHesaplamaService = $ucretHesaplamaService;
    }

    public function index(Request $request)
    {
        $paginate = $request->get('paginate', 10);
        $search = $request->get('search', '');
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');

        $query = OzelDersUcreti::query();

        if ($search) {
            $query->where('ad_soyad', 'LIKE', "%$search%")
                  ->orWhere('tarih', 'LIKE', "%$search%");
        }

        $data = $query->orderBy($sortBy, $orderBy)->paginate($paginate);

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id'       => 'required|exists:personeller,id',
            'tarih'             => 'required|date',
            'baslangic_saati'   => 'required|string',
            'bitis_saati'       => 'required|string',
            'ad_soyad'          => 'required|string',
            'ucret'             => 'required|numeric|min:0',
            'kar_yuzdesi'       => 'required|numeric|min:0',
        ]);

        // gelir = ucret + (ucret * (kar_yuzdesi / 100))
        $data['gelir'] = $data['ucret'] + ($data['ucret'] * ($data['kar_yuzdesi'] / 100));

        $record = OzelDersUcreti::create($data);

        return response()->json([
            'message' => 'Özel ders ücreti başarıyla oluşturuldu.',
            'data'    => $record
        ], 201);
    }

    public function show($id)
    {
        // e.g. GET /ozel-ders-ucretleri/{personel_id}
        $records = OzelDersUcreti::where('personel_id', '=', $id)->get();

        return response()->json(['data' => $records], 200);
    }

    public function update(Request $request, $id)
    {
        $record = OzelDersUcreti::findOrFail($id);

        $data = $request->validate([
            'tarih'             => 'required|date',
            'baslangic_saati'   => 'required|string',
            'bitis_saati'       => 'required|string',
            'ad_soyad'          => 'required|string',
            'ucret'             => 'required|numeric|min:0',
            'kar_yuzdesi'       => 'required|numeric|min:0',
        ]);

        $data['gelir'] = $data['ucret'] + ($data['ucret'] * ($data['kar_yuzdesi'] / 100));

        $record->update($data);

        return response()->json([
            'message' => 'Özel ders ücreti başarıyla güncellendi.',
            'data'    => $record
        ], 200);
    }

    public function destroy($id)
    {
        $record = OzelDersUcreti::findOrFail($id);
        $record->delete();

        return response()->json(['message' => 'Özel ders ücreti başarıyla silindi.'], 200);
    }
}

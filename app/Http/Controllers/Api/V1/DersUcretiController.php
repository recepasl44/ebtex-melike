<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Ders\DersUcreti;
use App\Services\UcretHesaplamaService;
use Illuminate\Http\Request;

class DersUcretiController extends Controller
{
    protected $ucretHesaplamaService;

    public function __construct(UcretHesaplamaService $ucretHesaplamaService)
    {
        $this->ucretHesaplamaService = $ucretHesaplamaService;
    }

    public function index(Request $request)
    {
        $limit = $request->get('paginate', 25);
        $orderBy = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'created_at');
        $search = $request->get('search', '');

        $query = DersUcreti::query();

        if ($search) {
            $query->where('ders_sayisi', 'LIKE', "%$search%")
                ->orWhere('ders_ucreti', 'LIKE', "%$search%")
                ->orWhereHas('personel', function ($q) use ($search) {
                    $q->where('ad', 'LIKE', "%$search%")
                        ->orWhere('soyad', 'LIKE', "%$search%");
                });
        }

        $dersUcretleri = $query->orderBy($sortBy, $orderBy)
            ->paginate($limit)
            ->appends($request->query());

        return response()->json($dersUcretleri, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'tarih' => 'required|date',
            'ders_sayisi' => 'required|integer|min:1',
            'ders_ucreti' => 'required|numeric|min:0',
        ]);

        $data['toplam_ucret'] = $this->ucretHesaplamaService->createDersUcreti($data['ders_sayisi'], $data['ders_ucreti']);

        $dersUcreti = DersUcreti::create($data);

        return response()->json(['message' => 'Ders ücreti başarıyla oluşturuldu.', 'data' => $dersUcreti], 201);
    }

    public function show($id)
    {
        $dersUcreti = DersUcreti::with('personel')->where('personel_id','=',$id)->get();

        return response()->json(['data' => $dersUcreti], 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'tarih' => 'required|date',
            'ders_sayisi' => 'required|integer|min:1',
            'ders_ucreti' => 'required|numeric|min:0',
        ]);

        $data['toplam_ucret'] = $this->ucretHesaplamaService->dersUcretiHesapla($data['ders_sayisi'], $data['ders_ucreti']);

        $dersUcreti = DersUcreti::findOrFail($id);
        $dersUcreti->update($data);

        return response()->json(['message' => 'Ders ücreti başarıyla güncellendi.', 'data' => $dersUcreti], 200);
    }

    public function destroy($id)
    {
        $dersUcreti = DersUcreti::findOrFail($id);
        $dersUcreti->delete();

        return response()->json(['message' => 'Ders ücreti başarıyla silindi.'], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Kupon\KuponUcreti;
use App\Services\UcretHesaplamaService;
use Illuminate\Http\Request;

class KuponUcretiController extends Controller
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

        $query = KuponUcreti::query();

        if ($search) {
            $query->where('urun_adi', 'LIKE', "%$search%")
                ->orWhere('urun_turu', 'LIKE', "%$search%");
        }

        $data = $query->orderBy($sortBy, $orderBy)->paginate($paginate);

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'tarih' => 'required|date',
            'urun_adi' => 'required|string',
            'urun_turu' => 'required|string',
            'satis_ucreti' => 'required|numeric|min:0',
            'kupon_yuzdesi' => 'required|numeric|min:0',
        ]);

        $data['gelir'] = $this->ucretHesaplamaService->createKuponUcreti($data['satis_ucreti'], $data['kupon_yuzdesi']);

        $record = KuponUcreti::create($data);

        return response()->json(['message' => 'Kupon ücreti başarıyla oluşturuldu.', 'data' => $record], 201);
    }

    public function show($id)
    {
        $record = KuponUcreti::where('personel_id','=',$id)->get();

        return response()->json(['data' => $record], 200);
    }

    public function update(Request $request, $id)
    {
        $record = KuponUcreti::findOrFail($id);

        $data = $request->validate([
            'tarih' => 'required|date',
            'urun_adi' => 'required|string',
            'urun_turu' => 'required|string',
            'satis_ucreti' => 'required|numeric|min:0',
            'kupon_yuzdesi' => 'required|numeric|min:0',
        ]);

        $data['gelir'] = $this->ucretHesaplamaService->createKuponUcreti($data['satis_ucreti'], $data['kupon_yuzdesi']);

        $record->update($data);

        return response()->json(['message' => 'Kupon ücreti başarıyla güncellendi.', 'data' => $record], 200);
    }

    public function destroy($id)
    {
        $record = KuponUcreti::findOrFail($id);
        $record->delete();

        return response()->json(['message' => 'Kupon ücreti başarıyla silindi.'], 200);
    }
}

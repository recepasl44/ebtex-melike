<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Transfer\Transfer;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    /**
     * Tüm transferleri listele.
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

        $query = Transfer::query();

        if ($search) {
            $query->where('transaction_type', 'LIKE', "%$search%")
                  ->orWhere('description', 'LIKE', "%$search%");
        }

        $transfers = $query->orderBy($sortBy, $orderBy)
                           ->paginate($limit)
                           ->appends($request->query());

        return response()->json($transfers, 200);
    }

    /**
     * Yeni bir transfer oluştur.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'transaction_type'   => 'required|string',
            'sender_branch_id'   => 'nullable|integer',
            'receiver_branch_id' => 'nullable|integer',
            'amount'             => 'required|numeric',
            'bank_account'       => 'nullable|string',
            'description'        => 'nullable|string',
            'seassion_id'        => 'nullable|integer',
        ]);

        $transfer = Transfer::create($data);

        return response()->json([
            'message' => 'Transfer başarıyla oluşturuldu.',
            'data' => $transfer
        ], 201);
    }

    /**
     * Belirli bir transferi göster.
     *
     * @param int $transferId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($transferId)
    {
        $transfer = Transfer::findOrFail($transferId);

        return response()->json(['data' => $transfer], 200);
    }

    /**
     * Transfer güncelle.
     *
     * @param Request $request
     * @param int $transferId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $transferId)
    {
        $transfer = Transfer::findOrFail($transferId);

        $data = $request->validate([
            'transaction_type'   => 'required|string',
            'sender_branch_id'   => 'nullable|integer',
            'receiver_branch_id' => 'nullable|integer',
            'amount'             => 'required|numeric',
            'bank_account'       => 'nullable|string',
            'description'        => 'nullable|string',
            'seassion_id'        => 'nullable|integer',
        ]);

        $transfer->update($data);

        return response()->json([
            'message' => 'Transfer başarıyla güncellendi.',
            'data' => $transfer
        ], 200);
    }

    /**
     * Transfer sil.
     *
     * @param int $transferId
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($transferId)
    {
        $transfer = Transfer::findOrFail($transferId);
        $transfer->delete();

        return response()->json(['message' => 'Transfer başarıyla silindi.'], 200);
    }
}

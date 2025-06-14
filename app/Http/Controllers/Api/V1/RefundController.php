<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Refunds\Refund;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RefundController extends Controller
{
    public function index(Supplier $supplier)
    {
        // Tüm iade kayıtlarını çek
        // ->where('refund_type','...') diyerek filtreleyebilirsiniz.
        $refunds = $supplier->refunds()->latest()->get();
        return response()->json(['data' => $refunds], 200);
    }

    public function store(Request $request, Supplier $supplier)
    {
        // "invoice" veya "debt" validasyonu
        $validator = Validator::make($request->all(), [
            'refund_type' => 'required|in:invoice,debt',
            'invoice_id'  => 'nullable|exists:invoices,id',
            'debt_id'     => 'nullable|exists:debts,id',
            'amount'      => 'required|numeric',
            'refund_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mantıksal kontrol: refund_type=invoice ise invoice_id dolu olmalı
        if ($request->refund_type === 'invoice' && !$request->invoice_id) {
            return response()->json([
                'message' => 'Fatura ID zorunludur (refund_type=invoice).'
            ], 422);
        }
        // refund_type=debt ise debt_id dolu olmalı
        if ($request->refund_type === 'debt' && !$request->debt_id) {
            return response()->json([
                'message' => 'Borç ID zorunludur (refund_type=debt).'
            ], 422);
        }

        $refund = new Refund();
        $refund->supplier_id = $supplier->id;
        $refund->refund_type = $request->refund_type;
        $refund->invoice_id  = ($request->refund_type === 'invoice') ? $request->invoice_id : null;
        $refund->debt_id     = ($request->refund_type === 'debt')    ? $request->debt_id    : null;
        $refund->amount      = $request->amount;
        $refund->refund_date = $request->refund_date;
        $refund->description = $request->description;
        $refund->save();

        return response()->json([
            'message' => 'İade oluşturuldu',
            'data'    => $refund
        ], 201);
    }

    public function show(Supplier $supplier, Refund $refund)
    {
        if ($refund->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'İade bulunamadı'], 404);
        }
        return response()->json($refund, 200);
    }

    public function update(Request $request, Supplier $supplier, Refund $refund)
    {
        if ($refund->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'İade bulunamadı'], 404);
        }

        $validator = Validator::make($request->all(), [
            'refund_type' => 'required|in:invoice,debt',
            'invoice_id'  => 'nullable|exists:invoices,id',
            'debt_id'     => 'nullable|exists:debts,id',
            'amount'      => 'required|numeric',
            'refund_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mantıksal kontrol
        if ($request->refund_type === 'invoice' && !$request->invoice_id) {
            return response()->json([
                'message' => 'Fatura ID zorunludur (refund_type=invoice).'
            ], 422);
        }
        if ($request->refund_type === 'debt' && !$request->debt_id) {
            return response()->json([
                'message' => 'Borç ID zorunludur (refund_type=debt).'
            ], 422);
        }

        $refund->refund_type = $request->refund_type;
        $refund->invoice_id  = ($request->refund_type === 'invoice') ? $request->invoice_id : null;
        $refund->debt_id     = ($request->refund_type === 'debt')    ? $request->debt_id    : null;
        $refund->amount      = $request->amount;
        $refund->refund_date = $request->refund_date;
        $refund->description = $request->description;
        $refund->save();

        return response()->json([
            'message' => 'İade güncellendi',
            'data'    => $refund
        ], 200);
    }

    public function destroy(Supplier $supplier, Refund $refund)
    {
        if ($refund->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'İade bulunamadı'], 404);
        }

        $refund->delete();
        return response()->json(['message' => 'İade silindi'], 200);
    }
}

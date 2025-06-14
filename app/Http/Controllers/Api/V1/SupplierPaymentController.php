<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use App\Models\SupplierPayment\SupplierPayment;
use App\Models\Debts\Debt;         // Örnek: Borç tablonuzun modeli
use App\Models\Seasons\Season; // Sezon modeliniz
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SupplierPaymentController extends Controller
{
    public function index(Supplier $supplier)
    {
        // Eski index metodunuz
        $payments = $supplier->payments()->orderBy('payment_date', 'DESC')->get();
        return response()->json(['data' => $payments], 200);
    }
public function store(Request $request, Supplier $supplier)
{
    // 1) Validasyon
    $validator = Validator::make($request->all(), [
        'amount'         => 'required|numeric',
        'payment_date'   => 'required|date',
        'description'    => 'nullable|string',
        'season_id'      => 'nullable|exists:seasons,id',
        'payment_method' => 'nullable|integer',

        // Yeni alanlar
        'is_paid'        => 'required|boolean', // 0 veya 1
        'due_date'       => 'nullable|date',
        'pdf_file'       => 'nullable|file|mimes:pdf|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // 2) Payment kaydı oluştur
    $payment = new SupplierPayment();
    $payment->supplier_id    = $supplier->id;
    $payment->amount         = $request->amount;
    $payment->payment_date   = $request->payment_date;
    $payment->description    = $request->description;
    $payment->season_id      = $request->season_id;
    $payment->payment_method = $request->payment_method ?? null;
    $payment->is_paid        = $request->is_paid ? 1 : 0;

    // Eğer ödeme yapılmadı ise due_date alanını kaydet
    if (!$payment->is_paid && $request->due_date) {
        $payment->due_date = $request->due_date;
    }

    // Eğer ödeme yapıldı ise PDF var mı?
    if ($payment->is_paid && $request->hasFile('pdf_file')) {
        $path = $request->file('pdf_file')->store('payments', 'public');
        $payment->pdf_path = $path;
    }

    $payment->save();

    return response()->json(['message' => 'Ödeme eklendi', 'data' => $payment], 201);
}


    public function show(Supplier $supplier, SupplierPayment $supplierPayment)
    {
        if ($supplierPayment->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Ödeme bulunamadı'], 404);
        }

        return response()->json($supplierPayment, 200);
    }

   public function update(Request $request, Supplier $supplier, SupplierPayment $supplierPayment)
{
    // 1) Bu ödeme bu tedarikçiye mi ait?
    if ($supplierPayment->supplier_id !== $supplier->id) {
        return response()->json(['message' => 'Ödeme bulunamadı'], 404);
    }

    // 2) Validasyon
    $validator = Validator::make($request->all(), [
        'amount'         => 'required|numeric',
        'payment_date'   => 'required|date',
        'description'    => 'nullable|string',
        'season_id'      => 'nullable|exists:seasons,id',
        'payment_method' => 'nullable|integer',
        'is_paid'        => 'required|boolean',
        'due_date'       => 'nullable|date',
        'pdf_file'       => 'nullable|file|mimes:pdf|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // 3) Güncelleme
    $supplierPayment->update([
        'amount'         => $request->amount,
        'payment_date'   => $request->payment_date,
        'description'    => $request->description,
        'season_id'      => $request->season_id,
        'payment_method' => $request->payment_method ?? null,
        'is_paid'        => $request->is_paid ? 1 : 0,
        'due_date'       => null, // Varsayılan
    ]);

    // Eğer is_paid=false ise due_date kaydedelim
    if (!$supplierPayment->is_paid && $request->due_date) {
        $supplierPayment->due_date = $request->due_date;
        $supplierPayment->pdf_path = null; // PDF'yi sıfırlayabiliriz
    }

    // Eğer is_paid=true ise PDF var mı?
    if ($supplierPayment->is_paid && $request->hasFile('pdf_file')) {
        // Önce eski pdf varsa silebilirsiniz (opsiyonel)
        if ($supplierPayment->pdf_path) {
            \Storage::disk('public')->delete($supplierPayment->pdf_path);
        }

        $path = $request->file('pdf_file')->store('payments', 'public');
        $supplierPayment->pdf_path = $path;
    }

    $supplierPayment->save();

    return response()->json(['message' => 'Ödeme güncellendi', 'data' => $supplierPayment], 200);
}


    public function destroy(Supplier $supplier, SupplierPayment $supplierPayment)
    {
        if ($supplierPayment->supplier_id !== $supplier->id) {
            return response()->json(['message' => 'Ödeme bulunamadı'], 404);
        }

        $supplierPayment->delete();
        return response()->json(['message' => 'Ödeme silindi'], 200);
    }

    /**
     * Yeni EKLENEN: Sezon bazlı ödeme özeti
     * GET /api/v1/suppliers/{supplier}/payments/summary
     *
     * Örnek JSON çıktı:
     * {
     *   "supplier_name": "Firma Adı",
     *   "data": [
     *     {
     *       "season": "2024-25",
     *       "owed": 400000,
     *       "cash": 30000,
     *       "credit": 20000,
     *       "other": 50000,
     *       "totalPaid": 100000,
     *       "remaining": 300000
     *     },
     *     ...
     *   ]
     * }
     */
  public function seasonSummary(Supplier $supplier)
    {
        // Ödeme yöntemi ID => anahtar eşlemesi
        // Örn: 1 => kredi kartı, 2 => nakit, 3 => senet, 4 => banka havalesi
        $paymentMethodMap = [
            1 => 'credit_card',
            2 => 'cash',
            3 => 'senet',
            4 => 'bank_transfer',
        ];

        // 1) Fatura adedi
        $invoicesCount = $supplier->invoices()->count();

        // 2) Borçları (debts) ödeme yöntemine göre topla
        $debts = [
            'total' => 0,
        ];
        foreach ($paymentMethodMap as $methodId => $methodKey) {
            $sum = $supplier->debts()
                ->where('payment_method_id', $methodId)
                ->sum('amount');
            $debts[$methodKey] = (float) $sum;
            $debts['total'] += (float) $sum;
        }

        // 3) İadeler (refunds) ödeme yöntemine göre
        $refunds = [
            'total' => 0,
        ];
        foreach ($paymentMethodMap as $methodId => $methodKey) {
            $sum = $supplier->refunds()
                ->where('payment_method_id', $methodId)
                ->sum('amount');
            $refunds[$methodKey] = (float) $sum;
            $refunds['total'] += (float) $sum;
        }

        // 4) Ödemeler (payments) ödeme yöntemine göre
        $payments = [
            'total' => 0,
        ];
        foreach ($paymentMethodMap as $methodId => $methodKey) {
            $sum = $supplier->payments()
                ->where('payment_method_id', $methodId)
                ->sum('amount');
            $payments[$methodKey] = (float) $sum;
            $payments['total'] += (float) $sum;
        }

        // Örnek response
        return response()->json([
            'supplier_id'    => $supplier->id,
            'supplier_name'  => $supplier->name,
            'total_invoices' => (int) $invoicesCount,
            'debts'          => $debts,      // Örn: {"credit_card": X, "cash": Y, ... "total": Z}
            'refunds'        => $refunds,    // ...
            'payments'       => $payments,   // ...
        ], 200);
    }

}

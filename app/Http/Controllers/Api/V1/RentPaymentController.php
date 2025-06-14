<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\RentInstallment\RentInstallment;
use App\Models\RentPayment\RentPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentPaymentController extends Controller
{
    /**
     * Tüm kira ödemelerini listele.
     * İsteğe bağlı olarak belirli bir taksite ait ödemeler için filter parametresi kullanılabilir.
     */
    public function index(Request $request)
    {
        $limit  = $request->get('paginate', 25);
        $order  = $request->get('orderBy', 'DESC');
        $sortBy = $request->get('sortBy', 'payment_date');
        
        $query = RentPayment::query()->with('installment');

        if ($rentInstallmentId = $request->get('rent_installment_id')) {
            $query->where('rent_installment_id', $rentInstallmentId);
        }
        
        $payments = $query->orderBy($sortBy, $order)
                          ->paginate($limit)
                          ->appends($request->query());

        return response()->json($payments, 200);
    }

    /**
     * Belirli bir ödeme kaydını göster.
     */
    public function show($id)
    {
        $payment = RentPayment::with('installment')->findOrFail($id);
        return response()->json(['data' => $payment], 200);
    }

    /**
     * Yeni bir ödeme kaydı ekle.
     *
     * Beklenen input:
     * - rent_installment_id, payment_date, amount
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'rent_installment_id' => 'required|integer|exists:rent_installments,id',
            'payment_date'        => 'required|date',
            'amount'              => 'required|numeric',
        ]);

        $installment = RentInstallment::findOrFail($data['rent_installment_id']);

        if ($data['amount'] > $installment->remaining_amount) {
            return response()->json([
                'message' => 'Girilen ödeme tutarı, taksit tutarından fazla olamaz.'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $paymentCount = RentPayment::where('rent_installment_id', $installment->id)->count();
            $payment = RentPayment::create([
                'rent_installment_id' => $installment->id,
                'payment_no'          => $paymentCount + 1,
                'payment_date'        => $data['payment_date'],
                'amount'              => $data['amount'],
            ]);

            // Taksitin kalan tutarını güncelle
            $installment->remaining_amount -= $data['amount'];
            $installment->save();

            DB::commit();
            return response()->json([
                'message' => 'Ödeme başarıyla eklendi.',
                'data' => $payment
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ödeme eklenirken hata oluştu.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ödeme kaydını güncelle.
     * (Güncelleme sonrasında ilgili taksitin kalan tutarı yeniden hesaplanmalıdır.)
     */
    public function update(Request $request, $id)
    {
        $payment = RentPayment::findOrFail($id);
        $oldAmount = $payment->amount;

        $data = $request->validate([
            'payment_date' => 'required|date',
            'amount'       => 'required|numeric',
        ]);

        $installment = $payment->installment;
        // Önce eski ödeme tutarını eski haline ekleyerek kalan tutarı düzeltelim
        $installment->remaining_amount += $oldAmount;

        if ($data['amount'] > $installment->remaining_amount) {
            return response()->json([
                'message' => 'Girilen güncel ödeme tutarı, taksit tutarından fazla olamaz.'
            ], 422);
        }

        DB::beginTransaction();
        try {
            $payment->update($data);

            // Yeni ödeme tutarı kadar çıkartalım
            $installment->remaining_amount -= $data['amount'];
            $installment->save();

            DB::commit();
            return response()->json([
                'message' => 'Ödeme başarıyla güncellendi.',
                'data' => $payment
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ödeme güncellenirken hata oluştu.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ödeme kaydını sil.
     *
     * Silme sonrasında ilgili taksitin kalan tutarı eski ödeme miktarının eklenmesiyle güncellenecektir.
     */
    public function destroy($id)
    {
        $payment = RentPayment::findOrFail($id);
        $installment = $payment->installment;

        DB::beginTransaction();
        try {
            // Silmeden önce ödenen miktarı taksite geri ekleyelim
            $installment->remaining_amount += $payment->amount;
            $installment->save();

            $payment->delete();

            DB::commit();
            return response()->json([
                'message' => 'Ödeme başarıyla silindi.'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ödeme silinirken hata oluştu.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}

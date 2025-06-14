<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Installment;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Ödeme Detayları
    public function show(Request $request, $studentId)
    {
        $search = $request->query('search', '');
        $paginate = $request->query('paginate', 10);
        $startDate = $request->query('start_date', null);
        $endDate = $request->query('end_date', null);

        // Taksitleri al
        $installmentsQuery = \App\Models\Installments\Installment::where('student_id', $studentId);

        // Geciken ödemeler
        $delayedInstallmentsQuery = $installmentsQuery->where('is_paid', 0)
            ->where('due_date', '<', now());

        // Tarih aralığı filtresi
        if ($startDate && $endDate) {
            $installmentsQuery->whereBetween('due_date', [$startDate, $endDate]);
            $delayedInstallmentsQuery->whereBetween('due_date', [$startDate, $endDate]);
        }

        // Search işlemi
        if ($search) {
            $installmentsQuery->where('amount', 'LIKE', "%$search%");
            $delayedInstallmentsQuery->where('amount', 'LIKE', "%$search%");
        }

        $installments = $installmentsQuery->paginate($paginate);
        $delayedInstallments = $delayedInstallmentsQuery->get();

        // Ödemeleri al
        $payments = \App\Models\Payments\Payment::where('student_id', $studentId)
            ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                $query->whereBetween('payment_date', [$startDate, $endDate]);
            })
            ->paginate($paginate);

        // Servis bilgilerini al
        $services = \App\Models\Services\Service::where('student_id', $studentId)->get();

        return response()->json([
            'installments' => $installments,
            'delayed_installments' => $delayedInstallments,
            'payments' => $payments,
            'services' => $services,
        ], 200);
    }

    // Ödeme Alma
    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'installment_id' => 'required|exists:installments,id',
            'amount_paid' => 'required|numeric',
            'payment_date' => 'required|date',
            'payment_method' => 'required|string',
        ]);

        $payment = \App\Models\Payments\Payment::create($data);

        // Taksiti güncelle
        $installment = \App\Models\Installments\Installment::findOrFail($data['installment_id']);
        $installment->update([
            'is_paid' => 1,
            'payment_date' => $data['payment_date'],
        ]);

        return response()->json([
            'message' => 'Ödeme başarıyla alındı.',
            'payment' => $payment,
        ], 201);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccountingController extends Controller
{
        public function financialSummary(Request $request)
    {
        $season = $request->query('season');
        $date = $request->query('date');

        // Liquid assets
        $cash = DB::table('open_accounts')
            ->when($season, fn($q) => $q->where('season_id', $season))
            ->sum('amount');

        $receivables = DB::table('installments')
            ->leftJoin('enrollments', 'installments.enrollment_id', '=', 'enrollments.id')
            ->when($season, fn($q) => $q->where('enrollments.seasons_id', $season))
            ->when($date, fn($q) => $q->whereDate('installments.due_date', '<=', $date))
            ->where(function ($q) {
                $q->whereNull('installments.is_paid')->orWhere('installments.is_paid', 0);
            })
            ->sum('installments.amount');

        $banks = DB::table('banks')
            ->when($season, fn($q) => $q->where('season_id', $season))
            ->select('bank_name', DB::raw('SUM(amount) as amount'))
            ->groupBy('bank_name')
            ->get();

        // Liabilities
        $personelBorcs = DB::table('personel_maas_borc')
            ->selectRaw('SUM(aylik_ucret * maas_sayisi) as total')
            ->first();

        $personelPaid = DB::table('personel_maas_odeme')
            ->selectRaw('SUM(miktar) as total')
            ->first();

        $personnelDebts = ($personelBorcs->total ?? 0) - ($personelPaid->total ?? 0);

        $supplierDebts = DB::table('debts')
            ->when($season, fn($q) => $q->where('season_id', $season))
            ->when($date, fn($q) => $q->whereDate('due_date', '<=', $date))
            ->sum('amount');

        return response()->json([
            'liquid_assets' => [
                'cash' => $cash,
                'remaining_receivables' => $receivables,
                'banks' => $banks,
            ],
            'liabilities' => [
                'personnel_payables' => $personnelDebts,
                'supplier_debts' => $supplierDebts,
            ],
        ]);
    }
    /**
     * Return daily financial summary.
     */
    public function dailySummary(Request $request)
    {
        $date = $request->query('date', now()->toDateString());

        // Payments from installments
        $paymentData = DB::table('payments')
            ->leftJoin('paymentmethods', 'payments.payment_method', '=', 'paymentmethods.id')
            ->whereDate('payments.payment_date', $date)
            ->selectRaw(
                'SUM(CASE WHEN paymentmethods.type = 0 THEN payments.amount_paid ELSE 0 END) as cash,' .
                'SUM(CASE WHEN paymentmethods.type = 1 THEN payments.amount_paid ELSE 0 END) as credit_card,' .
                'SUM(CASE WHEN paymentmethods.type not in (0,1) THEN payments.amount_paid ELSE 0 END) as other'
            )
            ->first();

        // Other income
        $otherIncome = DB::table('other_incomes')
            ->whereDate('date', $date)
            ->selectRaw(
                "SUM(CASE WHEN payment_method = 'Nakit' THEN amount ELSE 0 END) as cash,"
                . "SUM(CASE WHEN payment_method = 'Kredi Kartı' THEN amount ELSE 0 END) as credit_card,"
                . "SUM(CASE WHEN payment_method not in ('Nakit','Kredi Kartı') THEN amount ELSE 0 END) as other"
            )
            ->first();

        // Expenses
        $expenses = DB::table('expenses')
            ->whereDate('invoice_date', $date)
            ->selectRaw('SUM(amount) as total')
            ->first();

        // Personnel payments
        $personnelPayments = DB::table('personel_maas_odeme')
            ->whereDate('odeme_tarihi', $date)
            ->selectRaw('SUM(miktar) as total')
            ->first();

        // Supplier payments
        $supplierPayments = DB::table('supplier_payments')
            ->whereDate('payment_date', $date)
            ->selectRaw('SUM(amount) as total')
            ->first();

        // Transfers
        $transfer = DB::table('transfers')
            ->whereDate('created_at', $date)
            ->selectRaw(
                "SUM(CASE WHEN bank_account = '' THEN amount ELSE 0 END) as cash,"
                . "SUM(CASE WHEN bank_account <> '' THEN amount ELSE 0 END) as bank"
            )
            ->first();

        return response()->json([
            'payments' => [
                [
                    'category' => 'Taksit Ödemeleri',
                    'cash' => $paymentData->cash ?? 0,
                    'creditCard' => $paymentData->credit_card ?? 0,
                    'other' => $paymentData->other ?? 0,
                    'total' => ($paymentData->cash ?? 0) + ($paymentData->credit_card ?? 0) + ($paymentData->other ?? 0),
                ],
                [
                    'category' => 'Diğer Gelirler',
                    'cash' => $otherIncome->cash ?? 0,
                    'creditCard' => $otherIncome->credit_card ?? 0,
                    'other' => $otherIncome->other ?? 0,
                    'total' => ($otherIncome->cash ?? 0) + ($otherIncome->credit_card ?? 0) + ($otherIncome->other ?? 0),
                ],
                [
                    'category' => 'Giderler',
                    'cash' => $expenses->total ?? 0,
                    'creditCard' => 0,
                    'other' => 0,
                    'total' => $expenses->total ?? 0,
                ],
                [
                    'category' => 'Personel Ödemeleri',
                    'cash' => $personnelPayments->total ?? 0,
                    'creditCard' => 0,
                    'other' => 0,
                    'total' => $personnelPayments->total ?? 0,
                ],
                [
                    'category' => 'Tedarikçi Ödemeleri',
                    'cash' => $supplierPayments->total ?? 0,
                    'creditCard' => 0,
                    'other' => 0,
                    'total' => $supplierPayments->total ?? 0,
                ],
            ],
            'transfers' => [
                [
                    'type' => 'Toplam',
                    'cash' => $transfer->cash ?? 0,
                    'bank' => $transfer->bank ?? 0,
                    'total' => ($transfer->cash ?? 0) + ($transfer->bank ?? 0),
                ]
            ],
        ]);
    }
    
}
?>
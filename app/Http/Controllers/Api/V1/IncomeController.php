<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncomeController extends Controller
{
    /**
     * Gelir raporunu filtre seçeneklerine göre döndürür.
     *
     * Filtre Türleri:
     * - daily: Belirtilen gün için (parametre: date)
     * - monthly: Belirtilen ay ve yıl için (parametre: month, year)
     * - period: Başlangıç ve bitiş tarihleri arasında (parametre: start_date, end_date)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Filtre türü, varsayılan olarak "daily" kabul edilsin.
        $filter = $request->input('filter', 'daily');

        if ($filter == 'daily') {
            $request->validate([
                'date' => 'required|date',
            ]);
            $date = $request->input('date');

            $query = \App\Models\Payments\Payment::select(
                    'enrollments.service_id',
                    'services.name as service_name',
                    DB::raw('SUM(payments.amount_paid) as total_income'),
                    DB::raw('DATE(payments.payment_date) as payment_date')
                )
                ->join('installments', 'payments.installment_id', '=', 'installments.id')
                ->join('enrollments', 'installments.enrollment_id', '=', 'enrollments.id')
                ->join('services', 'enrollments.service_id', '=', 'services.id')
                ->whereDate('payments.payment_date', $date)
                ->groupBy('enrollments.service_id', 'services.name', DB::raw('DATE(payments.payment_date)'));

        } elseif ($filter == 'monthly') {
            $request->validate([
                'month' => 'required|integer|min:1|max:12',
                'year'  => 'required|integer',
            ]);
            $month = $request->input('month');
            $year = $request->input('year');

            $query = \App\Models\Payments\Payment::select(
                    'enrollments.service_id',
                    'services.name as service_name',
                    DB::raw('SUM(payments.amount_paid) as total_income'),
                    DB::raw('MONTH(payments.payment_date) as payment_month'),
                    DB::raw('YEAR(payments.payment_date) as payment_year')
                )
                ->join('installments', 'payments.installment_id', '=', 'installments.id')
                ->join('enrollments', 'installments.enrollment_id', '=', 'enrollments.id')
                ->join('services', 'enrollments.service_id', '=', 'services.id')
                ->whereMonth('payments.payment_date', $month)
                ->whereYear('payments.payment_date', $year)
                ->groupBy('enrollments.service_id', 'services.name', DB::raw('MONTH(payments.payment_date)'), DB::raw('YEAR(payments.payment_date)'));

        } elseif ($filter == 'period') {
            $request->validate([
                'start_date' => 'required|date',
                'end_date'   => 'required|date|after_or_equal:start_date',
            ]);
            $startDate = $request->input('start_date');
            $endDate   = $request->input('end_date');

            $query = \App\Models\Payments\Payment::select(
                    'enrollments.service_id',
                    'services.name as service_name',
                    DB::raw('SUM(payments.amount_paid) as total_income'),
                    DB::raw('MIN(payments.payment_date) as start_date'),
                    DB::raw('MAX(payments.payment_date) as end_date')
                )
                ->join('installments', 'payments.installment_id', '=', 'installments.id')
                ->join('enrollments', 'installments.enrollment_id', '=', 'enrollments.id')
                ->join('services', 'enrollments.service_id', '=', 'services.id')
                ->whereBetween('payments.payment_date', [$startDate, $endDate])
                ->groupBy('enrollments.service_id', 'services.name');

        } else {
            return response()->json(['error' => 'Geçersiz filtre türü'], 400);
        }

        // Sayfalama için per_page parametresi, varsayılan 10 kayıt
        $perPage = $request->input('per_page', 10);
        $incomes = $query->paginate($perPage);

        return response()->json($incomes);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Installment;

class OverduePaymentController extends Controller
{
    /**
     * Geciken ödemeleri listeler.
     *
     * Filtreler:
     * - daily   => due_date = bugünün tarihi
     * - monthly => due_date ay & yıl = bugünün ay & yılı
     * - yearly  => due_date yıl = bugünün yılı
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit  = $request->get('paginate', 25);
        $order  = $request->get('orderBy', 'ASC');
        $sortBy = $request->get('sortBy', 'due_date');
        $filter = $request->get('filter', null);

        // Taksitler tablosundan başlayarak enrollment ve student bilgilerini yüklüyoruz
        $query = \App\Models\Installments\Installment::query()
            ->with([
                'enrollment.student.branch'
            ])
            // Gecikmiş: ödenmemiş ve vade tarihi bugünden eski
            ->where('is_paid', 0)
            ->whereDate('due_date', '<', Carbon::today());

        // Filtre
        if ($filter === 'daily') {
            // Sadece bugüne ait due_date
            $query->whereDate('due_date', Carbon::today());
        } elseif ($filter === 'monthly') {
            // İçinde bulunduğumuz ay-yıl
            $query->whereMonth('due_date', Carbon::today()->month)
                  ->whereYear('due_date', Carbon::today()->year);
        } elseif ($filter === 'yearly') {
            // İçinde bulunduğumuz yıl
            $query->whereYear('due_date', Carbon::today()->year);
        }

        // Sıralama
        $query->orderBy($sortBy, $order);

        // Sorguyu çekelim (sayfalama)
        $installments = $query->paginate($limit)->appends($request->query());

        // Toplam gecikmiş borcu hesaplamak için (örn. tablo altına göstermek)
        // Bu hesaplamayı paginated data dışında yapmak isterseniz:
        $totalOverdueAmount = $query->sum('amount');

        // Tabloda göstereceğimiz format
        $data = $installments->map(function($installment) {
            $enrollment = $installment->enrollment ?? null;
            $student    = $enrollment->student ?? null;
            $branch     = $student && $student->branch ? $student->branch->name : null;

            // Gecikme gün sayısı
            $dueDate = $installment->due_date;
            $gapDays = 0;
            if ($dueDate < now()) {
                $gapDays = now()->diffInDays($dueDate);
            }

            // Taksitin, öğrencinin toplam ücretine göre yüzdesi
            // final_fee var ise:
            $finalFee = $enrollment->final_fee ?? 0;
            $percentOfTotal = $finalFee > 0
                ? round(($installment->amount / $finalFee) * 100, 2)
                : 0;

            return [
                // Örnek tablo alanları:
                'season'       => $enrollment->season_id ?? null,   // Sezon tablosu join'le gelebilir
                'sube'         => $branch,

                'soz_no'       => $enrollment->id ?? null,                  // Sözleşme no
                'adi'          => $student->first_name ?? '',
                'soyadi'       => $student->last_name ?? '',
                'program'      => $enrollment->program_id ?? null,  // Program tablosu join'le gelebilir
                'devre'        => $enrollment->season_id ?? null,   // Devre
                'sinif'        => $enrollment->level_id ?? null,    // Sınıf
                'vade'         => $installment->due_date->format('Y-m-d'),
                'vade_gap'     => $gapDays, // Kaç gün geçmiş
                'odeme_tipi'   => 'Nakit',  // Örnek sabit, ya da payment_method_id'ye göre
                'borc'         => $installment->amount,
                'taksit_sayisi'=> 1,        // Bu taksit, 1/Kaç?
                'percent_of_total' => $percentOfTotal, // Tüm ödemeye oranı
            ];
        });

        return response()->json([
            'current_page' => $installments->currentPage(),
            'total'        => $installments->total(),
            'per_page'     => $installments->perPage(),
            'total_overdue_amount' => $totalOverdueAmount,
            'data'         => $data,
        ]);
    }
}

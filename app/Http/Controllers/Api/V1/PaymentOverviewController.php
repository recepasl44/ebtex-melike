<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Installment;
use Illuminate\Http\Request;
use DB;
class PaymentOverviewController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $paginate = $request->query('paginate', 10);
        $startDate = $request->query('start_date', null);
        $endDate = $request->query('end_date', null);

        $query = \App\Models\Installments\Installment::with(['student', 'student.parent', 'student.program'])
            ->select([
                'student_id',
                DB::raw('SUM(amount) as total_amount'),
                DB::raw('COUNT(id) as installment_count'),
                DB::raw('SUM(CASE WHEN is_paid = 0 AND due_date < NOW() THEN amount ELSE 0 END) as overdue_amount')
            ])
            ->groupBy('student_id');

        // Tarih aralığı filtresi
        if ($startDate && $endDate) {
            $query->whereBetween('due_date', [$startDate, $endDate]);
        }

        // Search işlemi
        if ($search) {
            $query->whereHas('student', function ($q) use ($search) {
                $q->where('first_name', 'LIKE', "%$search%")
                  ->orWhere('last_name', 'LIKE', "%$search%");
            });
        }

        $students = $query->paginate($paginate);

        return response()->json($students, 200);
    }
}

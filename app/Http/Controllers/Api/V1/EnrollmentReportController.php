<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Enrollments\Enrollment;
use Illuminate\Http\Request;

class EnrollmentReportController extends Controller
{
    /**
     * Enrollments + Indirimler raporu.
     */
    public function index(Request $request)
    {
        // Örnek: Arama, sıralama, sayfalama parametreleri
        $limit  = $request->get('paginate', 25);
        $sortBy = $request->get('sortBy', 'id');       // Sözleşme no veya id
        $order  = $request->get('orderBy', 'DESC');

        // Eloquent sorgusu: ilgili ilişkiler eager load ediliyor.
        $query = Enrollment::query()
            ->with([
                'student.branch',    // Şube
                'student.program',   // Program
                'student.season',    // Devre
                'student.level',     // Sınıf
                'student.discounts'  // Öğrenciye atanmış indirimler (pivot)
            ]);

        // Arama filtresi (öğrenci adı/soyadı)
        if ($search = $request->get('search')) {
            $query->whereHas('student', function($q) use ($search) {
                $q->where('first_name', 'LIKE', "%{$search}%")
                  ->orWhere('last_name', 'LIKE', "%{$search}%");
            });
        }

        $enrollments = $query->orderBy($sortBy, $order)
                             ->paginate($limit)
                             ->appends($request->query());

        // Veriyi tablo formatında döndürmek için transform
        $data = $enrollments->map(function($enrollment) {
            // Öğrenci null kontrolü
            $student = $enrollment->student;
            if ($student) {
                $branch    = $student->branch ? $student->branch->name : '-';
                $program   = $student->program ? $student->program->name : '-';
                $season    = $student->season ? $student->season->name : '-';
                $level     = $student->level ? $student->level->name : '-';
                $studentNo = $student->student_no ?? '-';
                $firstName = $student->first_name ?? '-';
                $lastName  = $student->last_name ?? '-';
                $discounts = $student->discounts ? $student->discounts->pluck('name')->toArray() : [];
                $discountNamesString = implode(', ', $discounts);
            } else {
                $branch    = '-';
                $program   = '-';
                $season    = '-';
                $level     = '-';
                $studentNo = '-';
                $firstName = '-';
                $lastName  = '-';
                $discountNamesString = '';
            }


            // Enrollment tablosundaki discount alanı (örneğin yüzde veya sabit tutar)
            $enrollmentDiscount = $enrollment->discount;  
            $indirimBilgisi = $enrollmentDiscount 
                ? $enrollmentDiscount . ' (ind.)'
                : '';

            return [
                'sube'               => $branch,
                'sozlesme_no'        => $enrollment->id,         // Sözleşme No
                'okul_no'            => $studentNo,              // Okul No
                'ad'                 => $firstName,
                'soyad'              => $lastName,
                'program'            => $program,
                'devre'              => $season,
                'sinif'              => $level,
                'indirim_adi'        => $discountNamesString,    // İndirim isimleri (virgülle ayrılmış)
              
                'enrollment_indirim' => $indirimBilgisi,
                'toplam'             => $enrollment->final_fee,  // Final ücret
            ];
        });

        return response()->json([
            'current_page' => $enrollments->currentPage(),
            'total'        => $enrollments->total(),
            'per_page'     => $enrollments->perPage(),
            'data'         => $data,
        ]);
    }
}

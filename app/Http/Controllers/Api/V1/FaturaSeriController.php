<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FaturaSeriController extends Controller
{
    public function getNextSerial()
    {
        // Örnek tablo: invoice_serials (id, serial_no, count_no, created_at...)
        // Bu tabloyu migration ile oluşturmanız gerekiyor.
        // Aşağıdaki mantık: “abc + YYYYMMDD + 00001” formatında bir seri no üretir.

        $today = Carbon::now()->format('Ymd'); // 20250303
        $latest = DB::table('invoice_serials')
            ->whereDate('created_at', Carbon::now()->toDateString())
            ->orderBy('id', 'desc')
            ->first();

        $currentCount = 1;
        if ($latest) {
            $currentCount = $latest->count_no + 1;
        }

        $countPadded = str_pad($currentCount, 5, '0', STR_PAD_LEFT);
        $prefix = 'abc';
        $serial = $prefix . $today . $countPadded; 
        // Örn: abc2025030300009

        // DB’ye kaydet
        DB::table('invoice_serials')->insert([
            'serial_no' => $serial,
            'count_no' => $currentCount,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'serial_no' => $serial,
        ]);
    }
}

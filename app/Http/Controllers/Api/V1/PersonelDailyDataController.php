<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PersonelDailyData\PersonelDailyData; // Suppose this is your Eloquent model

class PersonelDailyDataController extends Controller
{
    // POST /api/v1/personel/daily-data
    public function store(Request $request)
    {
        // Example validation
        $data = $request->validate([
            'personel_id' => 'required|exists:personeller,id',
            'year'        => 'required|integer',
            'month'       => 'required|integer|min:1|max:12',
            'rows'        => 'required|array',
            'rows.*.day'         => 'required|integer|min:1|max:31',
            'rows.*.dersSayisi'  => 'required|numeric|min:0',
            'rows.*.soruSayisi'  => 'required|numeric|min:0',
            'rows.*.dersUcreti'  => 'required|numeric|min:0',
        ]);

        // Loop over rows, upsert or create records
        foreach ($data['rows'] as $row) {
            PersonelDailyData::updateOrCreate(
                [
                    'personel_id' => $data['personel_id'],
                    'year'        => $data['year'],
                    'month'       => $data['month'],
                    'day'         => $row['day'],
                ],
                [
                    'ders_sayisi'     => $row['dersSayisi'],
                    'soru_sayisi'     => $row['soruSayisi'],
                    'ders_ucreti'     => $row['dersUcreti'],
                    'toplam_ucret'    => $row['dersSayisi'] * $row['dersUcreti'],
                ]
            );
        }

        return response()->json([
            'message' => 'Günlük veriler kaydedildi.'
        ], 200);
    }

    // GET /api/v1/personel/daily-data?personel_id=...&year=...&month=...
    public function index(Request $request)
    {
        $personelId = $request->get('personel_id');
        $year       = $request->get('year');
        $month      = $request->get('month');

        if (!$personelId || !$year || !$month) {
            return response()->json(['data' => []], 200);
        }

        $rows = PersonelDailyData::where('personel_id', $personelId)
            ->where('year', $year)
            ->where('month', $month)
            ->orderBy('day', 'ASC')
            ->get();

        return response()->json([
            'data' => $rows
        ], 200);
    }
}

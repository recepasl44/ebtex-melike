<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PersonelWeeklyWorks\PersonelWeeklyWorks;

class PersonelWeeklyWorksController extends Controller
{
    // GET: /api/v1/personel/haftalik-calisma/{personelId}
    // List all weekly records for a given person
    public function index(Request $request, $personelId)
    {
        $records = PersonelWeeklyWorks::where('personel_id', $personelId)->get();
        return response()->json(['data' => $records], 200);
    }

    // POST: /api/v1/personel/haftalik-calisma
    public function store(Request $request)
    {
        $data = $request->validate([
            'personel_id'   => 'required|exists:personeller,id',
            'hafta_kac_gun' => 'required|integer|min:1|max:7',
            'gunluk_ucret'  => 'required|numeric|min:0',
        ]);

        $record = PersonelWeeklyWorks::create($data);

        return response()->json([
            'message' => 'Haftalık çalışma bilgisi başarıyla eklendi.',
            'data'    => $record
        ], 201);
    }

    // GET: /api/v1/personel/haftalik-calisma/show/{id}
    // (If you need a single record)
    public function show($id)
    {
        $record = PersonelWeeklyWorks::findOrFail($id);
        return response()->json(['data' => $record], 200);
    }

    // PUT: /api/v1/personel/haftalik-calisma/{id}
    public function update(Request $request, $id)
    {
        $record = PersonelWeeklyWorks::findOrFail($id);

        $data = $request->validate([
            'hafta_kac_gun' => 'required|integer|min:1|max:7',
            'gunluk_ucret'  => 'required|numeric|min:0',
        ]);

        $record->update($data);

        return response()->json([
            'message' => 'Haftalık çalışma bilgisi başarıyla güncellendi.',
            'data'    => $record
        ], 200);
    }

    // DELETE: /api/v1/personel/haftalik-calisma/{id}
    public function destroy($id)
    {
        $record = PersonelWeeklyWorks::findOrFail($id);
        $record->delete();

        return response()->json([
            'message' => 'Haftalık çalışma bilgisi başarıyla silindi.'
        ], 200);
    }
}

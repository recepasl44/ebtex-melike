<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Derslik\Derslik;
use Illuminate\Http\Request;

class DerslikController extends Controller
{
    /**
     * Tüm derslikleri listeleme (GET /derslikler).
     */
    public function index()
    {
        $derslikler = Derslik::all();
        return response()->json($derslikler);
    }

    /**
     * Yeni derslik ekleme (POST /derslikler).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'       => 'required|string',
            'short_name' => 'nullable|string',
            'ordered'    => 'required|integer',
        ]);

        $derslik = Derslik::create($validatedData);

        return response()->json([
            'message' => 'Derslik başarıyla oluşturuldu.',
            'data'    => $derslik,
        ], 201);
    }

    /**
     * Tek derslik görüntüleme (GET /derslikler/{id}).
     */
    public function show($id)
    {
        $derslik = Derslik::findOrFail($id);
        return response()->json($derslik);
    }

    /**
     * Derslik güncelleme (PUT/PATCH /derslikler/{id}).
     */
    public function update(Request $request, $id)
    {
        $derslik = Derslik::findOrFail($id);

        $validatedData = $request->validate([
            'name'       => 'sometimes|string',
            'short_name' => 'sometimes|string|nullable',
            'ordered'    => 'sometimes|integer',
        ]);

        $derslik->update($validatedData);

        return response()->json([
            'message' => 'Derslik başarıyla güncellendi.',
            'data'    => $derslik,
        ], 200);
    }

    /**
     * Derslik silme (DELETE /derslikler/{id}).
     */
    public function destroy($id)
    {
        $derslik = Derslik::findOrFail($id);
        $derslik->delete();

        return response()->json([
            'message' => 'Derslik başarıyla silindi.',
        ], 200);
    }
}

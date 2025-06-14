<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LessonClass\LessonClass;
use Illuminate\Http\Request;

class LessonClassController extends Controller
{
    /**
     * Tüm kayıtları listeleme (GET /lesson-classes).
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Varsayılan olarak 10
    
        $lessonClasses = LessonClass::query()->paginate($perPage);
    
        return response()->json($lessonClasses, 200);
    }
    

    /**
     * Yeni kayıt ekleme (POST /lesson-classes).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'name'         => 'required|string',
            'ordered'      => 'required|integer',
        ]);

        $lessonClass = LessonClass::create($validatedData);

        return response()->json([
            'message' => 'Sınıf başarıyla oluşturuldu.',
            'data'    => $lessonClass
        ], 201);
    }

    /**
     * Tek bir kaydı görüntüleme (GET /lesson-classes/{id}).
     */
    public function show($id)
    {
        $lessonClass = LessonClass::findOrFail($id);
        return response()->json($lessonClass);
    }

    /**
     * Kaydı güncelleme (PUT/PATCH /lesson-classes/{id}).
     */
    public function update(Request $request, $id)
    {
        $lessonClass = LessonClass::findOrFail($id);

        $validatedData = $request->validate([
            'classroom_id' => 'sometimes|exists:classrooms,id',
            'name'         => 'sometimes|string',
            'ordered'      => 'sometimes|integer',
        ]);

        $lessonClass->update($validatedData);

        return response()->json([
            'message' => 'Sınıf başarıyla güncellendi.',
            'data'    => $lessonClass
        ], 200);
    }

    /**
     * Kaydı silme (DELETE /lesson-classes/{id}).
     */
    public function destroy($id)
    {
        $lessonClass = LessonClass::findOrFail($id);
        $lessonClass->delete();

        return response()->json([
            'message' => 'Sınıf başarıyla silindi.'
        ], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LessonProgram\LessonProgram;
use Illuminate\Http\Request;

class LessonProgramController extends Controller
{
    /**
     * Tüm kayıtları listeleme (GET /lesson-programs).
     */
    public function index(Request $request)
    {
       
        $pageSize = $request->get('per_page', 10);  // 'per_page' parametresi ile sayfa başına gösterilecek öğe sayısını alıyoruz
    
        // LessonProgram modelinden verileri paginate ile alıyoruz
        $lessonPrograms = LessonProgram::paginate($pageSize);
    
        return response()->json($lessonPrograms);
    }
    

    /**
     * Yeni kayıt ekleme (POST /lesson-programs).
     */
    public function store(Request $request)
    {
        // Validasyon kuralları
        $validatedData = $request->validate([
            'lesson_id'                     => 'required|exists:lessons,id',
            'name'                          => 'required|string',
            'short_name'                    => 'nullable|string',
            'weekly_hourse'                 => 'required|integer',
            'settlement_type'               => 'nullable|string',
            'divided_lesson'                => 'required|boolean',
            'group'                         => 'nullable|string',
            'divided_lesson_outline_hourse' => 'nullable|string',
        ]);

        $lessonProgram = LessonProgram::create($validatedData);
        return response()->json([
            'message' => 'Ders programı başarıyla oluşturuldu.',
            'data'    => $lessonProgram
        ], 201);
    }

    /**
     * Tek bir kaydı görüntüleme (GET /lesson-programs/{id}).
     */
    public function show($id)
    {
        $lessonProgram = LessonProgram::findOrFail($id);
        return response()->json($lessonProgram);
    }

    /**
     * Kaydı güncelleme (PUT/PATCH /lesson-programs/{id}).
     */
    public function update(Request $request, $id)
    {
        $lessonProgram = LessonProgram::findOrFail($id);

        // Validasyon kuralları
        $validatedData = $request->validate([
            'lesson_id'                     => 'sometimes|exists:lessons,id',
            'name'                          => 'sometimes|string',
            'short_name'                    => 'sometimes|string|nullable',
            'weekly_hourse'                 => 'sometimes|integer',
            'settlement_type'               => 'sometimes|string|nullable',
            'divided_lesson'                => 'sometimes|boolean',
            'group'                         => 'sometimes|string|nullable',
            'divided_lesson_outline_hourse' => 'sometimes|string|nullable',
        ]);

        $lessonProgram->update($validatedData);

        return response()->json([
            'message' => 'Ders programı başarıyla güncellendi.',
            'data'    => $lessonProgram
        ], 200);
    }

    /**
     * Kaydı silme (DELETE /lesson-programs/{id}).
     */
    public function destroy($id)
    {
        $lessonProgram = LessonProgram::findOrFail($id);
        $lessonProgram->delete();

        return response()->json([
            'message' => 'Ders programı başarıyla silindi.',
        ], 200);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CommonLesson\CommonLesson;
use Illuminate\Http\Request;

class CommonLessonController extends Controller
{
    /**
     * Tüm ortak ders atamalarını listeleme (GET /common-lessons).
     */
    public function index()
    {
        $commonLessons = CommonLesson::with('lessonProgram')->get();
        return response()->json($commonLessons);
    }

    /**
     * Yeni ortak ders ataması oluşturma (POST /common-lessons).
     * Örnek JSON: {"lesson_classes_id": [1,2], "lesson_programs": 3}
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_classes_id' => 'required|array|min:1',
            'lesson_classes_id.*' => 'required|integer',
            'lesson_programs'   => 'required|integer|exists:lesson_programs,id',
        ]);

        // İş kuralı: İlgili sınıflara atanan derslerin toplamı, tek bir dersin weekly_hourse değeri,
        // ilgili sınıfın daily lesson ayarlarını aşmamalıdır.
        // Bu kontrolü ilgili modüller veya iş mantığı kapsamında uygulayabilirsiniz.
        // Burada temel CRUD işlemi sunuluyor.

        $commonLesson = CommonLesson::create($validatedData);
        return response()->json([
            'message' => 'Ortak ders ataması başarıyla oluşturuldu.',
            'data'    => $commonLesson,
        ], 201);
    }

    /**
     * Tek ortak ders atamasını görüntüleme (GET /common-lessons/{id}).
     */
    public function show($id)
    {
        $commonLesson = CommonLesson::with('lessonProgram')->findOrFail($id);
        return response()->json($commonLesson);
    }

    /**
     * Ortak ders atamasını güncelleme (PUT/PATCH /common-lessons/{id}).
     */
    public function update(Request $request, $id)
    {
        $commonLesson = CommonLesson::findOrFail($id);
        $validatedData = $request->validate([
            'lesson_classes_id' => 'sometimes|array|min:1',
            'lesson_classes_id.*' => 'required_with:lesson_classes_id|integer',
            'lesson_programs'   => 'sometimes|integer|exists:lesson_programs,id',
        ]);

        $commonLesson->update($validatedData);
        return response()->json([
            'message' => 'Ortak ders ataması başarıyla güncellendi.',
            'data'    => $commonLesson,
        ], 200);
    }

    /**
     * Ortak ders atamasını silme (DELETE /common-lessons/{id}).
     */
    public function destroy($id)
    {
        $commonLesson = CommonLesson::findOrFail($id);
        $commonLesson->delete();
        return response()->json([
            'message' => 'Ortak ders ataması başarıyla silindi.',
        ], 200);
    }
}

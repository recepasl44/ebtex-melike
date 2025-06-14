<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ClassLesson\ClassLesson;
use App\Models\DailyLessonNumber\DailyLessonNumber;
use App\Models\LessonProgram\LessonProgram;
use Illuminate\Http\Request;

class ClassLessonController extends Controller
{
    /**
     * Tüm sınıf ders atamalarını listeleme (GET /class-lessons).
     */
    public function index()
    {
        $classLessons = ClassLesson::with('dailyLessonNumber')->get();
        return response()->json($classLessons);
    }

    /**
     * Yeni sınıf ders ataması oluşturma (POST /class-lessons).
     * Input örneği: {"daily_lesson_number_id":5, "lesson_program_ids":[1,2,3]}
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'daily_lesson_number_id' => 'required|exists:daily_lesson_numbers,id',
            'lesson_program_ids'     => 'required|array|min:1',
            'lesson_program_ids.*'   => 'required|exists:lesson_programs,id',
        ]);

        // İlgili daily lesson record'unu getiriyoruz
        $dailyLesson = DailyLessonNumber::findOrFail($validatedData['daily_lesson_number_id']);
        $totalLessonsAllowed = $dailyLesson->total_lessons;

        // Seçilen lesson_program kayıtlarının weekly_hourse toplamını hesaplıyoruz
        $sumWeeklyHourse = LessonProgram::whereIn('id', $validatedData['lesson_program_ids'])->sum('weekly_hourse');

        if ($sumWeeklyHourse > $totalLessonsAllowed) {
            return response()->json([
                'message' => 'Atanan derslerin toplam weekly_hourse (' . $sumWeeklyHourse . ') ' .
                             'sınıfın toplam ders sayısını (' . $totalLessonsAllowed . ') aşıyor.',
            ], 422);
        }

        $classLesson = ClassLesson::create($validatedData);

        return response()->json([
            'message' => 'Sınıf için ders ataması başarıyla oluşturuldu.',
            'data'    => $classLesson,
        ], 201);
    }

    /**
     * Tek sınıf ders atamasını görüntüleme (GET /class-lessons/{id}).
     */
    public function show($id)
    {
        $classLesson = ClassLesson::with('dailyLessonNumber')->findOrFail($id);
        return response()->json($classLesson);
    }

    /**
     * Sınıf ders atamasını güncelleme (PUT/PATCH /class-lessons/{id}).
     */
    public function update(Request $request, $id)
    {
        $classLesson = ClassLesson::findOrFail($id);
        $validatedData = $request->validate([
            'daily_lesson_number_id' => 'sometimes|exists:daily_lesson_numbers,id',
            'lesson_program_ids'     => 'sometimes|array|min:1',
            'lesson_program_ids.*'   => 'required_with:lesson_program_ids|exists:lesson_programs,id',
        ]);

        // Eğer daily_lesson_number_id veya lesson_program_ids değişiyorsa kontrol edelim:
        if (isset($validatedData['daily_lesson_number_id']) || isset($validatedData['lesson_program_ids'])) {
            $dailyLessonId = $validatedData['daily_lesson_number_id'] ?? $classLesson->daily_lesson_number_id;
            $dailyLesson = DailyLessonNumber::findOrFail($dailyLessonId);
            $totalLessonsAllowed = $dailyLesson->total_lessons;

            $lessonProgramIds = $validatedData['lesson_program_ids'] ?? $classLesson->lesson_program_ids;
            $sumWeeklyHourse = LessonProgram::whereIn('id', $lessonProgramIds)->sum('weekly_hourse');

            if ($sumWeeklyHourse > $totalLessonsAllowed) {
                return response()->json([
                    'message' => 'Atanan derslerin toplam weekly_hourse (' . $sumWeeklyHourse . ') ' .
                                 'sınıfın toplam ders sayısını (' . $totalLessonsAllowed . ') aşıyor.',
                ], 422);
            }
        }

        $classLesson->update($validatedData);

        return response()->json([
            'message' => 'Sınıf için ders ataması başarıyla güncellendi.',
            'data'    => $classLesson,
        ], 200);
    }

    /**
     * Sınıf ders atamasını silme (DELETE /class-lessons/{id}).
     */
    public function destroy($id)
    {
        $classLesson = ClassLesson::findOrFail($id);
        $classLesson->delete();

        return response()->json([
            'message' => 'Sınıf için ders ataması başarıyla silindi.',
        ], 200);
    }
}

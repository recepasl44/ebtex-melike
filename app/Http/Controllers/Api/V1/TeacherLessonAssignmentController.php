<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TeacherLessonAssignment\TeacherLessonAssignment;
use App\Models\LessonProgram\LessonProgram;
use App\Models\Teacher\Teacher;
use Illuminate\Http\Request;

class TeacherLessonAssignmentController extends Controller
{
    public function index()
    {
        $assignments = TeacherLessonAssignment::with(['teacher', 'lessonProgram'])->get();
        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'lesson_programs' => 'required|integer|exists:lesson_programs,id',
            'classes_lesson_taught' => 'required|array|min:1',
            'classes_lesson_taught.*' => 'required|integer'
        ]);

        // Dersin weekly_hourse değerini alıyoruz
        $lessonProgram = LessonProgram::findOrFail($validatedData['lesson_programs']);
        $newAssignmentHours = $lessonProgram->weekly_hourse;

        // Öğretmenin mevcut atanan haftalık ders saatlerinin toplamını hesaplıyoruz
        $teacher = Teacher::findOrFail($validatedData['teacher_id']);
        $currentAssignments = TeacherLessonAssignment::where('teacher_id', $teacher->id)
            ->with('lessonProgram')->get();
        $currentTotalHours = $currentAssignments->sum(function($assignment) {
            return $assignment->lessonProgram->weekly_hourse;
        });

        // Eğer öğretmenin kapasitesi (örneğin max_weekly_hours) varsa kontrol edilebilir:
        if(isset($teacher->max_weekly_hours)) {
            if($currentTotalHours + $newAssignmentHours > $teacher->max_weekly_hours) {
                return response()->json([
                    'message' => 'Atanan derslerin toplam haftalık saati (' . ($currentTotalHours + $newAssignmentHours) .
                                 ') öğretmenin kapasitesini aşıyor (' . $teacher->max_weekly_hours . ').'
                ], 422);
            }
        }

        $assignment = TeacherLessonAssignment::create($validatedData);

        // Not: İsteğe bağlı, öğretmenin toplam atanan saatlerini güncellemek için ek işlem yapılabilir.

        return response()->json([
            'message' => 'Öğretmene ders ataması başarıyla oluşturuldu.',
            'data'    => $assignment,
        ], 201);
    }

    public function show($id)
    {
        $assignment = TeacherLessonAssignment::with(['teacher', 'lessonProgram'])->findOrFail($id);
        return response()->json($assignment);
    }

    public function update(Request $request, $id)
    {
        $assignment = TeacherLessonAssignment::findOrFail($id);
        $validatedData = $request->validate([
            'teacher_id' => 'sometimes|exists:teachers,id',
            'lesson_programs' => 'sometimes|integer|exists:lesson_programs,id',
            'classes_lesson_taught' => 'sometimes|array|min:1',
            'classes_lesson_taught.*' => 'required_with:classes_lesson_taught|integer'
        ]);

        // Eğer teacher_id veya lesson_programs değişiyorsa kapasite kontrolü
        $teacherId = $validatedData['teacher_id'] ?? $assignment->teacher_id;
        $lessonProgramId = $validatedData['lesson_programs'] ?? $assignment->lesson_programs;
        $teacher = Teacher::findOrFail($teacherId);
        $lessonProgram = LessonProgram::findOrFail($lessonProgramId);
        $newAssignmentHours = $lessonProgram->weekly_hourse;

        $currentAssignments = TeacherLessonAssignment::where('teacher_id', $teacher->id)
            ->where('id', '!=', $assignment->id)
            ->with('lessonProgram')->get();
        $currentTotalHours = $currentAssignments->sum(function($assignment) {
            return $assignment->lessonProgram->weekly_hourse;
        });

        if(isset($teacher->max_weekly_hours)) {
            if($currentTotalHours + $newAssignmentHours > $teacher->max_weekly_hours) {
                return response()->json([
                    'message' => 'Atanan derslerin toplam haftalık saati (' . ($currentTotalHours + $newAssignmentHours) .
                                 ') öğretmenin kapasitesini aşıyor (' . $teacher->max_weekly_hours . ').'
                ], 422);
            }
        }

        $assignment->update($validatedData);
        return response()->json([
            'message' => 'Öğretmene ders ataması başarıyla güncellendi.',
            'data'    => $assignment,
        ], 200);
    }

    public function destroy($id)
    {
        $assignment = TeacherLessonAssignment::findOrFail($id);
        $assignment->delete();
        return response()->json([
            'message' => 'Öğretmene ders ataması başarıyla silindi.',
        ], 200);
    }
}

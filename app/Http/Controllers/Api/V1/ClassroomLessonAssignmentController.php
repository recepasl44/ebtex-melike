<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ClassroomLessonAssignment\ClassroomLessonAssignment;
use App\Models\LessonProgram\LessonProgram;
use App\Models\Classrooms\Classroom;
use Illuminate\Http\Request;

class ClassroomLessonAssignmentController extends Controller
{
    public function index()
    {
        $assignments = ClassroomLessonAssignment::with(['classroom', 'lessonProgram'])->get();
        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'lesson_programs' => 'required|integer|exists:lesson_programs,id',
            'classes_lesson_taught' => 'required|array|min:1',
            'classes_lesson_taught.*' => 'required|integer'
        ]);

        $lessonProgram = LessonProgram::findOrFail($validatedData['lesson_programs']);
        $assignmentHours = $lessonProgram->weekly_hourse;

        // Eğer derslik için de kapasite kontrolü yapılacaksa; burada classroom modelindeki kapasite bilgisine göre kontrol edilebilir.

        $assignment = ClassroomLessonAssignment::create($validatedData);

        return response()->json([
            'message' => 'Derslik için ders ataması başarıyla oluşturuldu.',
            'data'    => $assignment,
        ], 201);
    }

    public function show($id)
    {
        $assignment = ClassroomLessonAssignment::with(['classroom', 'lessonProgram'])->findOrFail($id);
        return response()->json($assignment);
    }

    public function update(Request $request, $id)
    {
        $assignment = ClassroomLessonAssignment::findOrFail($id);
        $validatedData = $request->validate([
            'classroom_id' => 'sometimes|exists:classrooms,id',
            'lesson_programs' => 'sometimes|integer|exists:lesson_programs,id',
            'classes_lesson_taught' => 'sometimes|array|min:1',
            'classes_lesson_taught.*' => 'required_with:classes_lesson_taught|integer'
        ]);

        $assignment->update($validatedData);
        return response()->json([
            'message' => 'Derslik için ders ataması başarıyla güncellendi.',
            'data'    => $assignment,
        ], 200);
    }

    public function destroy($id)
    {
        $assignment = ClassroomLessonAssignment::findOrFail($id);
        $assignment->delete();
        return response()->json([
            'message' => 'Derslik için ders ataması başarıyla silindi.'
        ], 200);
    }
}

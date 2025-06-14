<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\DailyLessonNumber\DailyLessonNumber;
use Illuminate\Http\Request;

class DailyLessonNumberController extends Controller
{
    public function index()
    {
        $records = DailyLessonNumber::with('lessonClass')->get();
        return response()->json($records);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_classes_id' => 'required|exists:lesson_classes,id',
            'days'              => 'required|array',
            // İsteğe bağlı; hesaplamayı istemci ya da sunucu tarafında yapabilirsiniz.
            'total_lessons'     => 'required|integer',
        ]);

        $record = DailyLessonNumber::create($validatedData);
        return response()->json([
            'message' => 'Daily Lesson Number record created successfully.',
            'data'    => $record,
        ], 201);
    }

    public function show($id)
    {
        $record = DailyLessonNumber::with('lessonClass')->findOrFail($id);
        return response()->json($record);
    }

    public function update(Request $request, $id)
    {
        $record = DailyLessonNumber::findOrFail($id);
        $validatedData = $request->validate([
            'lesson_classes_id' => 'sometimes|exists:lesson_classes,id',
            'days'              => 'sometimes|array',
            'total_lessons'     => 'sometimes|integer',
        ]);

        $record->update($validatedData);
        return response()->json([
            'message' => 'Daily Lesson Number record updated successfully.',
            'data'    => $record,
        ], 200);
    }

    public function destroy($id)
    {
        $record = DailyLessonNumber::findOrFail($id);
        $record->delete();
        return response()->json([
            'message' => 'Daily Lesson Number record deleted successfully.',
        ], 200);
    }
}

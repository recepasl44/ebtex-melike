<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LessonHour\LessonHour;
use Illuminate\Http\Request;

class LessonHourController extends Controller
{
    public function index()
    {
        $hours = LessonHour::all();
        return response()->json($hours);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'lesson_number' => 'required|integer',
            'lesson_hourse' => 'required|date_format:H:i',
        ]);

        $hour = LessonHour::create($validatedData);
        return response()->json([
            'message' => 'Lesson Hour created successfully.',
            'data'    => $hour,
        ], 201);
    }

    public function show($id)
    {
        $hour = LessonHour::findOrFail($id);
        return response()->json($hour);
    }

    public function update(Request $request, $id)
    {
        $hour = LessonHour::findOrFail($id);
        $validatedData = $request->validate([
            'lesson_number' => 'sometimes|integer',
            'lesson_hourse' => 'sometimes|date_format:H:i',
        ]);
        $hour->update($validatedData);
        return response()->json([
            'message' => 'Lesson Hour updated successfully.',
            'data'    => $hour,
        ], 200);
    }

    public function destroy($id)
    {
        $hour = LessonHour::findOrFail($id);
        $hour->delete();
        return response()->json([
            'message' => 'Lesson Hour deleted successfully.',
        ], 200);
    }
}

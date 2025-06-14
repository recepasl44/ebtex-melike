<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\LessonDay\LessonDay;
use Illuminate\Http\Request;

class LessonDayController extends Controller
{
    public function index()
    {
        $days = LessonDay::all();
        return response()->json($days);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'       => 'required|string',
            'short_name' => 'nullable|string',
        ]);

        $day = LessonDay::create($validatedData);
        return response()->json([
            'message' => 'Lesson Day created successfully.',
            'data'    => $day,
        ], 201);
    }

    public function show($id)
    {
        $day = LessonDay::findOrFail($id);
        return response()->json($day);
    }

    public function update(Request $request, $id)
    {
        $day = LessonDay::findOrFail($id);
        $validatedData = $request->validate([
            'name'       => 'sometimes|string',
            'short_name' => 'sometimes|string|nullable',
        ]);
        $day->update($validatedData);
        return response()->json([
            'message' => 'Lesson Day updated successfully.',
            'data'    => $day,
        ], 200);
    }

    public function destroy($id)
    {
        $day = LessonDay::findOrFail($id);
        $day->delete();
        return response()->json([
            'message' => 'Lesson Day deleted successfully.',
        ], 200);
    }
}

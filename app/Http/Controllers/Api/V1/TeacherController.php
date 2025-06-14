<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Teacher\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Tüm öğretmen kayıtlarını listeleme (GET /teachers).
     */
    public function index()
    {
        $teachers = Teacher::with(['personel', 'lessonClass'])->get();
        return response()->json($teachers);
    }

    /**
     * Yeni öğretmen kaydı oluşturma (POST /teachers).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'personel_id'      => 'required|exists:personeller,id',
            'name_surname'     => 'required|string',
            'short_name'       => 'nullable|string',
            'branch'           => 'required|string',
            'class_teacher_id' => 'required|exists:lesson_classes,id',
            'social_club'      => 'nullable|string',
            'email'            => 'required|email',
        ]);

        $teacher = Teacher::create($validatedData);

        return response()->json([
            'message' => 'Öğretmen kaydı başarıyla oluşturuldu.',
            'data'    => $teacher,
        ], 201);
    }

    /**
     * Tek öğretmen kaydını görüntüleme (GET /teachers/{id}).
     */
    public function show($id)
    {
        $teacher = Teacher::with(['personel', 'lessonClass'])->findOrFail($id);
        return response()->json($teacher);
    }

    /**
     * Öğretmen kaydını güncelleme (PUT/PATCH /teachers/{id}).
     */
    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        $validatedData = $request->validate([
            'personel_id'      => 'sometimes|exists:personeller,id',
            'name_surname'     => 'sometimes|string',
            'short_name'       => 'sometimes|string|nullable',
            'branch'           => 'sometimes|string',
            'class_teacher_id' => 'sometimes|exists:lesson_classes,id',
            'social_club'      => 'sometimes|string|nullable',
            'email'            => 'sometimes|email',
        ]);

        $teacher->update($validatedData);

        return response()->json([
            'message' => 'Öğretmen kaydı başarıyla güncellendi.',
            'data'    => $teacher,
        ], 200);
    }

    /**
     * Öğretmen kaydını silme (DELETE /teachers/{id}).
     */
    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();

        return response()->json([
            'message' => 'Öğretmen kaydı başarıyla silindi.',
        ], 200);
    }
}

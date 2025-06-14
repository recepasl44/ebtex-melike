<?php

namespace App\Models\ClassroomLessonAssignment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomLessonAssignment extends Model
{
    use HasFactory;

    protected $table = 'classroom_lesson_assignments';

    protected $fillable = [
        'classroom_id',
        'lesson_programs',
        'classes_lesson_taught',
    ];

    protected $casts = [
        'classes_lesson_taught' => 'array',
    ];

    public function classroom()
    {
        return $this->belongsTo(\App\Models\Classrooms\Classroom::class, 'classroom_id', 'id');
    }

    public function lessonProgram()
    {
        return $this->belongsTo(\App\Models\LessonProgram\LessonProgram::class, 'lesson_programs', 'id');
    }
}

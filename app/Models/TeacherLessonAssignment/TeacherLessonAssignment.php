<?php

namespace App\Models\TeacherLessonAssignment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherLessonAssignment extends Model
{
    use HasFactory;

    protected $table = 'teacher_lesson_assignments';

    protected $fillable = [
        'teacher_id',
        'lesson_programs',
        'classes_lesson_taught',
    ];

    protected $casts = [
        'classes_lesson_taught' => 'array',
    ];

    public function teacher()
    {
        return $this->belongsTo(\App\Models\Teacher\Teacher::class, 'teacher_id', 'id');
    }

    public function lessonProgram()
    {
        return $this->belongsTo(\App\Models\LessonProgram\LessonProgram::class, 'lesson_programs', 'id');
    }
}

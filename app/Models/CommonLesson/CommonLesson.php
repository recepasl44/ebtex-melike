<?php

namespace App\Models\CommonLesson;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommonLesson extends Model
{
    use HasFactory;

    protected $table = 'common_lessons';

    protected $fillable = [
        'lesson_classes_id',
        'lesson_programs',
    ];

    protected $casts = [
        'lesson_classes_id' => 'array',
    ];

    /**
     * İlgili ortak dersin detayları (lesson_programs tablosundan) alınabilir.
     */
    public function lessonProgram()
    {
        return $this->belongsTo(\App\Models\LessonProgram\LessonProgram::class, 'lesson_programs', 'id');
    }
}

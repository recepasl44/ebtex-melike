<?php

namespace App\Models\ClassLesson;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassLesson extends Model
{
    use HasFactory;

    protected $table = 'class_lessons';

    protected $fillable = [
        'daily_lesson_number_id',
        'lesson_program_ids',
    ];

    protected $casts = [
        'lesson_program_ids' => 'array',
    ];

    public function dailyLessonNumber()
    {
        return $this->belongsTo(\App\Models\DailyLessonNumber\DailyLessonNumber::class, 'daily_lesson_number_id', 'id');
    }
}

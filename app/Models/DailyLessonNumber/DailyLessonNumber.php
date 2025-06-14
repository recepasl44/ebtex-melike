<?php

namespace App\Models\DailyLessonNumber;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyLessonNumber extends Model
{
    use HasFactory;

    protected $table = 'daily_lesson_numbers';

    protected $fillable = [
        'lesson_classes_id',
        'days',
        'total_lessons',
    ];

    protected $casts = [
        'days' => 'array',
    ];

    public function lessonClass()
    {
        return $this->belongsTo(\App\Models\LessonClass\LessonClass::class, 'lesson_classes_id', 'id');
    }
}

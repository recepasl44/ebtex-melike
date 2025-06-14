<?php

namespace App\Models\LessonProgram;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgram extends Model
{
    use HasFactory;

    protected $table = 'lesson_programs';

    protected $fillable = [
        'lesson_id',
        'name',
        'short_name',
        'weekly_hourse',
        'settlement_type',
        'divided_lesson',
        'group',
        'divided_lesson_outline_hourse',
    ];

    /**
     * Eğer LessonProgram -> Lesson ilişkisi lazımsa:
     */
    public function lesson()
    {
        return $this->belongsTo(\App\Models\Lessons\Lesson::class, 'lesson_id', 'id');
    }
}

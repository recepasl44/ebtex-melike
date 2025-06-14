<?php

namespace App\Models\LessonHour;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonHour extends Model
{
    use HasFactory;

    protected $table = 'lesson_hours';

    protected $fillable = [
        'lesson_number',
        'lesson_hourse',
    ];
}

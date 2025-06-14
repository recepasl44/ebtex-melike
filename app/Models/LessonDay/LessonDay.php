<?php

namespace App\Models\LessonDay;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonDay extends Model
{
    use HasFactory;

    protected $table = 'lesson_days';

    protected $fillable = [
        'name',
        'short_name',
    ];
}

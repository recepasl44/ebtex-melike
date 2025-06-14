<?php

namespace App\Models\Curriculum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AchievementDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'achievement_id',
        'score',
        'lesson_duration',
        'difficulty_level',
        'tests',
        'notes',
    ];

    public function achievement()
    {
        return $this->belongsTo(Achievement::class);
    }
}

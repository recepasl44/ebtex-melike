<?php

namespace App\Models\QuizLevels\Traits;

use App\Models\Levels\Level;
use App\Models\QuizLevels\QuizLevel;
use App\Models\Scholarships\Scholarship;

/**
 * Class QuizLevelRelationship
 */
trait QuizLevelRelationship
{
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function classrooms()
    {
        return $this->hasMany(QuizLevel::class, 'quiz_level_id');
    }
}

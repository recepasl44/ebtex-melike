<?php

namespace App\Models\QuizSessions\Traits;

use App\Http\Resources\BrancheResource;
use App\Models\Levels\Level;
use App\Models\Programs\Program;
use App\Models\QuizSessions\QuizSession;
use App\Models\QuizTimes\QuizTime;
use App\Models\Scholarships\Scholarship;

/**
 * Class QuizSessionRelationship
 */
trait QuizSessionRelationship
{
    public function branche()
    {
        return $this->belongsTo(BrancheResource::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function times()
    {
        return $this->hasMany(QuizTime::class);
    }
}

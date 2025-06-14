<?php

namespace App\Models\QuizBranches\Traits;

use App\Http\Resources\BrancheResource;
use App\Models\Scholarships\Scholarship;
use App\Models\QuizSessions\QuizSession;
use App\Models\Students\Student;

/**
 * Class QuizBrancheRelationship
 */
trait QuizBrancheRelationship
{
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function branche()
    {
        return $this->belongsTo(BrancheResource::class);
    }

    public function session()
    {
        return $this->belongsTo(QuizSession::class);
    }
}

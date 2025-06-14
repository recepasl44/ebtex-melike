<?php

namespace App\Models\QuizApplications\Traits;

use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;

/**
 * Class QuizApplicationRelationship
 */
trait QuizApplicationRelationship
{
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

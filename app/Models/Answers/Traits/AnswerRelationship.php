<?php

namespace App\Models\Answers\Traits;

use App\Models\Questions\Question;
use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;

/**
 * Class AnswerRelationship
 */
trait AnswerRelationship
{
    public function student(){
        return $this->belongsTo(Student::class);
    }
    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }

    public function question(){
        return $this->belongsTo(Question::class);
    }
}

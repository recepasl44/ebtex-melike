<?php

namespace App\Models\QuizQuestions\Traits;

use App\Models\Questions\Question;
use App\Models\Quizzes\Quiz;

/**
 * Class QuizQuestionRelationship
 */
trait QuizQuestionRelationship
{
    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }
}

<?php

namespace App\Models\QuizClassrooms\Traits;

use App\Models\ClassRooms\ClassRoom;
use App\Models\QuizTypes\QuizType;
use App\Models\Quizzes\Quiz;

/**
 * Class QuizClassroomRelationship
 */
trait QuizClassroomRelationship
{
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    public function quiz_type()
    {
        return $this->belongsTo(QuizType::class);
    }

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

}

<?php

namespace App\Models\QuizMatchs\Traits;

use App\Models\Branches\Branche;
use App\Models\ClassRooms\ClassRoom;
use App\Models\Levels\Level;
use App\Models\QuizTypes\QuizType;
use App\Models\Quizzes\Quiz;
use App\Models\Seasons\Season;
use App\Models\System\Session;

/**
 * Class QuizMatchRelationship
 */
trait QuizMatchRelationship
{
    public function quiz_type()
    {
        return $this->belongsTo(QuizType::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function branche()
    {
        return $this->belongsTo(Branche::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    public function classroom()
    {
        return $this->belongsTo(ClassRoom::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

}

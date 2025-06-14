<?php

namespace App\Models\Traits;

use App\Models\Chapters\Chapter;
use App\Models\Curriculum\Achievement;
use App\Models\Lessons\Lesson;
use App\Models\Topics\Topic;
use App\Models\Units\Unit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\App;

/**
 * Class ColorRelationship
 */
trait Curriculum
{
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }

    public function achievement()
    {
        return $this->belongsTo(Achievement::class);
    }
}
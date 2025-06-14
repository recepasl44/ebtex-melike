<?php

namespace App\Models\QuestionCurriculums\Traits;

/**
 * Class QuestionCurriculumRelationship
 */
 use App\Models\Questions\Question;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;


trait QuestionCurriculumRelationship
{
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
    public function lesson(){
        return $this->belongsTo(Lesson::class);
    }
    public function unit(){
        return $this->belongsTo(Unit::class);
    }
    public function chapter(){
        return $this->belongsTo(Chapter::class);
    }
    public function topic(){
        return $this->belongsTo(Topic::class);
    }
     public function achievement(){
        return $this->belongsTo(Achievement::class);
    }
				
}

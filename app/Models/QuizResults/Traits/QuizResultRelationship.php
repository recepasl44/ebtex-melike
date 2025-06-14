<?php

namespace App\Models\QuizResults\Traits;

/**
 * Class QuizResultRelationship
 */
 use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;


trait QuizResultRelationship
{
    /*
    * put you model relationships here
    * Take below example for reference
    */
    /*
    public function users() {
        //Note that the below will only work if user is represented as user_id in your table
        //otherwise you have to provide the column name as a parameter
        //see the documentation here : https://laravel.com/docs/6.x/eloquent-relationships
        $this->belongsTo(User::class);
    }
     */

     public function quiz(){
		return $this->belongsTo(Quiz::class);
	}
    public function student(){
		return $this->belongsTo(Student::class);
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

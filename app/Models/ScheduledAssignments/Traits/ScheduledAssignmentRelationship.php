<?php

namespace App\Models\ScheduledAssignments\Traits;

/**
 * Class ScheduledAssignmentRelationship
 */

use App\Models\Periods\Period;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Lessons\Lesson;
use App\Models\Students\Student;
use App\Models\Teacher\Teacher;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;
use App\Models\Sources\Source;


trait ScheduledAssignmentRelationship
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

     public function program(){
		return $this->belongsTo(Program::class);
	}
				public function level(){
		return $this->belongsTo(Level::class);
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
				public function source(){
		return $this->belongsTo(Source::class);
	}

    public function student(){
         return $this->belongsTo(Student::class);
    }

    public function teacher(){
         return $this->belongsTo(Teacher::class);
    }

    public function period(){
         return $this->belongsTo(Period::class);
    }
				
}

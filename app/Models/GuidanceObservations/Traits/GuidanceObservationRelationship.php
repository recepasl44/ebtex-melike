<?php

namespace App\Models\GuidanceObservations\Traits;

/**
 * Class GuidanceObservationRelationship
 */
 use App\Models\Students\Student;
use App\Models\Lessons\Lesson;
use App\Models\Teacher\Teacher;


trait GuidanceObservationRelationship
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

    public function student(){
		return $this->belongsTo(Student::class);
	}
    public function lesson(){
		return $this->belongsTo(Lesson::class);
	}
    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }
				
}

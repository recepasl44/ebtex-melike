<?php

namespace App\Models\Events\Traits;

/**
 * Class EventRelationship
 */
 use App\Models\EventTypes\EventType;
use App\Models\GroupTypes\GroupType;
use App\Models\Groups\Group;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\UsedAreas\UsedArea;
use App\Models\Teachers\Teacher;


trait EventRelationship
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

     public function eventtype(){
		return $this->belongsTo(EventType::class);
	}
				public function grouptype(){
		return $this->belongsTo(GroupType::class);
	}
				public function group(){
		return $this->belongsTo(Group::class);
	}
				public function program(){
		return $this->belongsTo(Program::class);
	}
				public function level(){
		return $this->belongsTo(Level::class);
	}
				public function usedarea(){
		return $this->belongsTo(UsedArea::class);
	}
				public function teacher(){
		return $this->belongsTo(Teacher::class);
	}
				
}

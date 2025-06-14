<?php

namespace App\Models\Attendances\Traits;

/**
 * Class AttendanceRelationship
 */

use App\Models\Access\User\User;
use App\Models\AttendanceDays\AttendanceDay;
use App\Models\GroupTypes\GroupType;
use App\Models\Groups\Group;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Students\Student;
use App\Models\Teacher\Teacher;
use App\Models\UsedAreas\UsedArea;


trait AttendanceRelationship
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

    public function students(){
         return $this->belongsToMany(Student::class, 'attendancestudents');
    }
    public function teachers(){
         return $this->belongsToMany(Teacher::class, 'attendanceteachers');
    }
    public function days()
    {
        return $this->hasMany(AttendanceDay::class);
    }

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }

    public function responsible(){
         return $this->belongsTo(Teacher::class, 'responsible_id');
    }

    public function duty_teacher(){
         return $this->belongsTo(Teacher::class, 'duty_teacher_id');
    }

    public function duty_user(){
         return $this->belongsTo(User::class, 'duty_user_id');
    }

				
}

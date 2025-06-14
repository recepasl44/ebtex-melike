<?php

namespace App\Models\EmployeeAcademics\Traits;

/**
 * Class EmployeeAcademicRelationship
 */
 use App\Models\Employees\Employee;
use App\Models\EducationStatuses\EducationStatus;
use App\Models\Jobs\Job;
use App\Models\Professions\Profession;
use App\Models\AcademicTitles\AcademicTitle;
use App\Models\Programs\Program;
use App\Models\Levels\Level;


trait EmployeeAcademicRelationship
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

     public function employee(){
		return $this->belongsTo(Employee::class);
	}
				public function educationstatus(){
		return $this->belongsTo(EducationStatus::class);
	}
				public function job(){
		return $this->belongsTo(Job::class);
	}
				public function profession(){
		return $this->belongsTo(Profession::class);
	}
				public function academictitle(){
		return $this->belongsTo(AcademicTitle::class);
	}
				public function program(){
		return $this->belongsTo(Program::class);
	}
				public function level(){
		return $this->belongsTo(Level::class);
	}
				
}

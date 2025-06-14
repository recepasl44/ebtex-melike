<?php

namespace App\Models\AttendanceDays\Traits;

/**
 * Class AttendanceDayRelationship
 */
 use App\Models\Attendances\Attendance;


trait AttendanceDayRelationship
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

     public function attendance(){
		return $this->belongsTo(Attendance::class);
	}
				
}

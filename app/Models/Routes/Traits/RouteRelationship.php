<?php

namespace App\Models\Routes\Traits;

/**
 * Class RouteRelationship
 */
 use App\Models\Vehicles\Vehicle;


trait RouteRelationship
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

     public function vehicle(){
		return $this->belongsTo(Vehicle::class);
	}
				
}

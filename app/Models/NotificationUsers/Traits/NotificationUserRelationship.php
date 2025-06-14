<?php

namespace App\Models\NotificationUsers\Traits;

/**
 * Class NotificationUserRelationship
 */
 use App\Models\Notifications\Notification;
use App\Models\Access\User\User;


trait NotificationUserRelationship
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

     public function notification(){
		return $this->belongsTo(Notification::class);
	}
    public function user(){
		return $this->belongsTo(User::class);
	}
				
}

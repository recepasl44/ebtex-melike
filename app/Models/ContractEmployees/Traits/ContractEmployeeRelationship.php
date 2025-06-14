<?php

namespace App\Models\ContractEmployees\Traits;

/**
 * Class ContractEmployeeRelationship
 */
 use App\Models\Employees\Employee;
use App\Models\ContractTypes\ContractType;


trait ContractEmployeeRelationship
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
				public function contracttype(){
		return $this->belongsTo(ContractType::class);
	}
				
}

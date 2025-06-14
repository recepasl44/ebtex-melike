<?php

namespace App\Models\Schools\Traits;

use App\Models\Cities\City;
use App\Models\Counties\County;
use App\Models\Countries\Country;
use App\Models\SchoolTypes\SchoolType;

/**
 * Class SchoolRelationship
 */
trait SchoolRelationship
{
    public function country(){
        return $this->belongsTo(Country::class);
    }
    public function city(){
        return $this->belongsTo(City::class);
    }
    public function county(){
        return $this->belongsTo(County::class);
    }
    public function type(){
        return $this->belongsTo(SchoolType::class, 'type_id');
    }
}

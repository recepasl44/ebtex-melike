<?php

namespace App\Models\Counties\Traits;

use App\Models\Cities\City;

/**
 * Class CountyRelationship
 */
trait CountyRelationship
{
    public function city(){
        return $this->belongsTo(City::class);
    }
}

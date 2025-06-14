<?php

namespace App\Models\Cities\Traits;
use App\Models\Countries\Country;

/**
 * Class CityRelationship
 */
trait CityRelationship
{
    public function country()
    {
        return $this->belongsTo(Country::class,'country_id');
    }
}

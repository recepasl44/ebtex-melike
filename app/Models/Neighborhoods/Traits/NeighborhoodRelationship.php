<?php

namespace App\Models\Neighborhoods\Traits;

use App\Models\Districts\District;

/**
 * Class NeighborhoodRelationship
 */
trait NeighborhoodRelationship
{
    public function district(){
        return $this->belongsTo(District::class);
    }
}

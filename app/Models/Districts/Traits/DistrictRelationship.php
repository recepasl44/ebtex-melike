<?php

namespace App\Models\Districts\Traits;

use App\Models\Counties\County;

/**
 * Class DistrictRelationship
 */
trait DistrictRelationship
{
    public function county(){
        return $this->belongsTo(County::class);
    }
}

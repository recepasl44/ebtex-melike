<?php

namespace App\Models\UsedAreas\Traits;

use App\Models\GroupTypes\GroupType;

/**
 * Class UsedAreaRelationship
 */
 

trait UsedAreaRelationship
{
    public function group_type(){
        return $this->belongsTo(GroupType::class);
    }

     
}

<?php

namespace App\Models\ClassRooms\Traits;

use App\Models\Branches\Branche;
use App\Models\Levels\Level;
use App\Models\Schools\School;

/**
 * Class ClassRoomRelationship
 */
trait ClassRoomRelationship
{
    public function school(){
        return $this->belongsTo(School::class);
    }

    public function branche(){
        return $this->belongsTo(Branche::class);
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }
}

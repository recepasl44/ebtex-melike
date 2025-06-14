<?php

namespace App\Models\Courses\Traits;

use App\Models\Levels\Level;

/**
 * Class CourseRelationship
 */
trait CourseRelationship
{
    public function level(){
        return $this->belongsTo(Level::class);
    }
}

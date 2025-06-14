<?php

namespace App\Models\Lessons\Traits;

use App\Models\Areas\Area;

/**
 * Class LessonRelationship
 */
trait LessonRelationship
{
    public function area(){
        return $this->belongsTo(Area::class);
    }
}

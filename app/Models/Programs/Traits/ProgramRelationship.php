<?php

namespace App\Models\Programs\Traits;

use App\Models\SchoolCategories\SchoolCategory;

/**
 * Class ProgramRelationship
 */
trait ProgramRelationship
{
    public function category()
    {
        return $this->belongsTo(SchoolCategory::class);
    }
}

<?php

namespace App\Models\Scholarships\Traits;

use App\Http\Resources\BrancheResource;
use App\Models\Seasons\Season;

/**
 * Class ScholarshipRelationship
 */
trait ScholarshipRelationship
{
    public function branche()
    {
        return $this->belongsTo(BrancheResource::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }
}

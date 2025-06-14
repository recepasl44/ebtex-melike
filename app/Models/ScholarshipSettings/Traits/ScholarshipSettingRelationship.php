<?php

namespace App\Models\ScholarshipSettings\Traits;

use App\Models\Scholarships\Scholarship;

/**
 * Class ScholarshipSettingRelationship
 */
trait ScholarshipSettingRelationship
{
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }
}

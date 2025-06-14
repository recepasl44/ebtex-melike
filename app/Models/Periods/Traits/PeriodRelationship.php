<?php

namespace App\Models\Periods\Traits;

use App\Models\Teacher\Teacher;

/**
 * Class PeriodRelationship
 */
trait PeriodRelationship
{
    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }
}

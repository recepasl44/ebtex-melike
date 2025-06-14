<?php

namespace App\Models\Installments\Traits;
use App\Models\Enrollments\Enrollment;

/**
 * Class InstallmentRelationship
 */
trait InstallmentRelationship
{
    public function enrollment(){
        return $this->belongsTo(Enrollment::class);
    }
}

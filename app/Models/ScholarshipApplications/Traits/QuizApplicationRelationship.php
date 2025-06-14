<?php

namespace App\Models\ScholarshipApplications\Traits;

use App\Models\Scholarships\Scholarship;
use App\Models\Students\Student;

/**
 * Class ScholarshipApplicationRelationship
 */
trait ScholarshipApplicationRelationship
{
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

<?php

namespace App\Models\Guardians\Traits;

use App\Models\Students\Student;

/**
 * Class GuardianRelationship
 */
trait GuardianRelationship
{
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

<?php

namespace App\Models\AssignmentStudents\Traits;

use App\Models\Assignments\Assignment;
use App\Models\Students\Student;

/**
 * Class AssignmentStudentRelationship
 */
trait AssignmentStudentRelationship
{
    public function assignment(){
        return $this->belongsTo(Assignment::class);
    }

    public function student(){
        return $this->belongsTo(Student::class);
    }
}

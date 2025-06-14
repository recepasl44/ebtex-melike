<?php

namespace App\Models\Assignments\Traits;

use App\Models\Courses\Course;
use App\Models\Levels\Level;
use App\Models\Programs\Program;
use App\Models\SchoolTypes\SchoolType;
use App\Models\Teacher\Teacher;

/**
 * Class AssignmentRelationship
 */
trait AssignmentRelationship
{
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function program(){
        return $this->belongsTo(Program::class);
    }
    public function level(){
        return $this->belongsTo(Level::class);
    }
    public function schooltype(){
        return $this->belongsTo(SchoolType::class);
    }
    public function course(){
        return $this->belongsTo(Course::class);
    }
    public function source(){
        return $this->belongsTo(Course::class);
    }

}

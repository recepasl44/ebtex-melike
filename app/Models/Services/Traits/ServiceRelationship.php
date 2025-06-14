<?php

namespace App\Models\Services\Traits;

use App\Models\Branches\Branche;
use App\Models\Courses\Course;
use App\Models\Levels\Level;
use App\Models\Programs\Program;
use App\Models\ServiceTypes\ServiceType;
use App\Models\Students\Student;

/**
 * Class ServiceRelationship
 */
trait ServiceRelationship
{
    public function branche()
    {
        return $this->belongsTo(Branche::class);
    }

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function program(){
        return $this->belongsTo(Program::class);
    }

    public function type(){
        return $this->belongsTo(ServiceType::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'servicestudents');
    }
}

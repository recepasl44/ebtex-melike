<?php

namespace App\Models\Students\Traits;

use App\Models\Access\User\User;
    use App\Models\Agreements\Agreement;

use App\Models\Addresses\Address;
use App\Models\Branches\Branche;
use App\Models\Countries\Country;
use App\Models\Courses\Course;
use App\Models\Discounts\Discount;
use App\Models\Enrollments\Enrollment;
use App\Models\Guardians\Guardian;
use App\Models\Levels\Level;
use App\Models\Payments\Payment;
use App\Models\Programs\Program;
use App\Models\Quizzes\Quiz;
use App\Models\Schools\School;
use App\Models\Services\Service;

/**
 * Class StudentRelationship
 */
trait StudentRelationship
{
    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function agreements()
    {
        return $this->hasMany(Agreement::class, 'student_id', 'id');
    }
    public function guardian()
    {
        return $this->belongsTo(Guardian::class, 'parent_id');
    }
    public function addresses()
    {
        return $this->morphMany(Address::class, 'addressable');
    }
    public function guardians()
    {
        return $this->hasMany(Guardian::class);
    }

    public function branche()
    {
        return $this->belongsTo(Branche::class);
    }

    public function nationality()
    {
        return $this->belongsTo(Country::class, 'nationality_id');
    }

    public function program(){
        return $this->belongsTo(Program::class);
    }
    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function school(){
        return $this->belongsTo(School::class);
    }

    public function createdby(){
        return $this->belongsTo(User::class, 'created_by');
    }

    public function enrollments(){
        return $this->hasMany(Enrollment::class);
    }

    public function payments(){
        return $this->hasMany(Payment::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'servicestudents');
    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'discountstudents');
    }

    public function class_teacher()
    {
        return $this->belongsTo(User::class, 'class_teacher_id');
    }

    public function advisor_teacher(){
        return $this->belongsTo(User::class, 'advisor_teacher_id');
    }
    public function guide_teacher(){
        return $this->belongsTo(User::class, 'guide_teacher_id');
    }

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'quizstudents')
            ->withPivot('booklet_type_id')
            ->withPivot('booklet_id')
            ->withTimestamps();
    }



}

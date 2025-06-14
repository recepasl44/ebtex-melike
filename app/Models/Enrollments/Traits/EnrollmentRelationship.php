<?php

namespace App\Models\Enrollments\Traits;

use App\Models\Discounts\Discount;
use App\Models\DiscountStudents\DiscountStudent;
use App\Models\Installments\Installment;
use App\Models\Services\Service;
use App\Models\Students\Student;

/**
 * Class EnrollmentRelationship
 */
trait EnrollmentRelationship
{
    public function student(){
        return $this->belongsTo(Student::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function installments()
    {
        return $this->hasMany(Installment::class);
    }

    public function discounts()
    {
        return $this->hasManyThrough(
            Discount::class,
            DiscountStudent::class,
            'student_id', // DiscountStudent tablosundaki öğrenci ile eşleşen sütun
            'id',         // Discounts tablosundaki indirim ID sütunu
            'student_id', // Enrollments tablosundaki öğrenci ID sütunu
            'discount_id' // DiscountStudent tablosundaki indirim ID sütunu
        )->whereColumn('discounts.service_id', 'enrollments.service_id');
    }
}

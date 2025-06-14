<?php

namespace App\Models\Discounts\Traits;

use App\Models\Services\Service;
use App\Models\Students\Student;

/**
 * Class DiscountRelationship
 */
trait DiscountRelationship
{
    public function service(){
        return $this->belongsTo(Service::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'discountstudents');
    }
}

<?php

namespace App\Models\Payments\Traits;

use App\Models\Installments\Installment;
use App\Models\Students\Student;

/**
 * Class PaymentRelationship
 */
trait PaymentRelationship
{
    public function installment(){
        return $this->belongsTo(Installment::class);
    }

    public function student(){
        return $this->belongsTo(Student::class);
    }
}

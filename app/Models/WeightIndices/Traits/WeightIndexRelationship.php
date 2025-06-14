<?php

namespace App\Models\WeightIndices\Traits;

use App\Models\Students\Student;

/**
 * Class WeightIndexRelationship
 */
trait WeightIndexRelationship
{
    public function student(){
        return $this->belongsTo(Student::class);
    }
}

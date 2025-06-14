<?php

namespace App\Models\OpticalForms\Traits;

use App\Models\Branches\Branche;
use App\Models\OpticalAttributes\OpticalAttribute;
use App\Models\QuizTypes\QuizType;

/**
 * Class OpticalFormRelationship
 */
trait OpticalFormRelationship
{
    public function quiz_type()
    {
        return $this->belongsTo(QuizType::class);
    }

    public function branche()
    {
        return $this->belongsTo(Branche::class);
    }

    public function attributes()
    {
        return $this->hasMany(OpticalAttribute::class, 'form_id');
    }
}

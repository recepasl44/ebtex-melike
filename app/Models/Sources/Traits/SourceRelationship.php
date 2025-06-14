<?php

namespace App\Models\Sources\Traits;

use App\Models\SourceTypes\SourceType;
use App\Models\Teacher\Teacher;

/**
 * Class SourceRelationship
 */
trait SourceRelationship
{
    public function source_type(){
        return $this->belongsTo(SourceType::class, 'source_type_id');
    }
    public function teacher(){
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }
}

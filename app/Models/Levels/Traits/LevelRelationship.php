<?php

namespace App\Models\Levels\Traits;

use App\Models\Programs\Program;

/**
 * Class LevelRelationship
 */
trait LevelRelationship
{
    public function program(){
        return $this->belongsTo(Program::class);
    }
}

<?php

namespace App\Models\Platforms\Traits;

use App\Models\Core\Domain;

/**
 * Class PlatformRelationship
 */
trait PlatformRelationship
{
    public function domain(){
        return $this->hasOne(Domain::class);
    }

    public function settings(){
        return $this->hasOne(Domain::class);
    }
}

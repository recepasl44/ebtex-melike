<?php

namespace App\Models\Components\Traits;

use App\Models\ComponentValues\ComponentValue;
use Illuminate\Support\Facades\App;

/**
 * Class ComponentRelationship
 */
trait ComponentRelationship
{
    public function values()
    {
        return $this->hasOne(ComponentValue::class, 'component_id', 'id');
    }
}

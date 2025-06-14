<?php

namespace App\Models\Branches\Traits;

use App\Models\Access\User\User;

/**
 * Class BrancheRelationship
 */
trait BrancheRelationship
{
    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }
}

<?php

namespace App\Models\Addresses\Traits;

/**
 * Class AddressRelationship
 */
trait AddressRelationship
{
    public function addressable()
    {
        return $this->morphTo();
    }
}

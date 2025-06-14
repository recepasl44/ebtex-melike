<?php

namespace App\Models\Links\Traits;

use App\Models\Organizations\Organization;

/**
 * Class LinkRelationship
 */
trait LinkRelationship
{
    public function organizations() {
        return $this->belongsToMany(Organization::class, 'organization_links', 'link_id', 'organization_id')->withPivot('url');
    }
}

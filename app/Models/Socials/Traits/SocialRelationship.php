<?php

namespace App\Models\Socials\Traits;

use App\Models\Organizations\Organization;

/**
 * Class SocialRelationship
 */
trait SocialRelationship
{
    public function organizations() {
        return $this->belongsToMany(Organization::class, 'organization_socials', 'social_id', 'organization_id')->withPivot('url');
    }
}

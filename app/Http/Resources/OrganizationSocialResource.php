<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;

class OrganizationSocialResource extends MainResource
{
    protected $relationsArray = ['organization', 'social'];

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function fields($request)
    {
        return [
            'id'                => $this->id,
            'organization_id'   => $this->organization_id,
            'social_id'         => $this->social_id,
            'organization'      => $this->when($this->relationLoaded('organization'), new OrganizationResource($this->organization)),
            'social'            => $this->when($this->relationLoaded('social'), new SocialResource($this->social)),
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

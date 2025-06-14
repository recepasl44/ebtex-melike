<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;

class OrganizationLinkResource extends MainResource
{

    protected $relationsArray = ['organization', 'link'];
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
            'link_id'           => $this->link_id,
            'organization'      => $this->when($this->relationLoaded('organization'), new OrganizationResource($this->organization)),
            'link'              => $this->when($this->relationLoaded('link'), new LinkResource($this->link)),
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

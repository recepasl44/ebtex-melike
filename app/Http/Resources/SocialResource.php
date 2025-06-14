<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;

class SocialResource extends MainResource
{
    protected $relationsArray = ['organizations'];
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
            'name'              => $this->name,
            'slug'              => $this->slug,
            'type_id'           => $this->type_id,
            'organizations'      => $this->when($this->relationLoaded('organizations'), OrganizationResource::collection($this->organizations)),
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

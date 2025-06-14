<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;

class TeamResource extends MainResource
{
    protected $relationsArray = ['organization', 'children', 'users', ];

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
            'description'       => $this->description,
            'cover'             => Storage::disk('public')->url($this->cover),
            'parent_id'         => $this->parent_id,
            'organization'      => $this->when($this->relationLoaded('organization'), new OrganizationResource($this->organization)),
            'children'          => $this->when($this->relationLoaded('children'), $this->collection($this->children)),
            'users'             => $this->when($this->relationLoaded('users'), $this->users),
            'created_at'        => optional($this->created_at)->toDateString(),
            'created_by'        => (is_null($this->user_name)) ? optional($this->owner)->first_name : $this->user_name,
        ];
    }
}

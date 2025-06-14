<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;
class FeatureResource extends MainResource
{
    protected $relationsArray = ['users'];
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
//            'type_id'           => $this->type_id,
            'users'             => $this->when($this->relationLoaded('users'), UserResource::collection($this->users)),
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

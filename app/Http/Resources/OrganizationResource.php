<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;

class OrganizationResource extends MainResource
{
    protected $relationsArray = ['socials', 'links', 'type', 'category', 'teams', 'type.organizations'];
    protected $extrasArray = ['users', 'user_counts', 'user_images'];

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
            'url'               => $this->url,
            'profile_img'       => Storage::disk('public')->url($this->profile_img),
            'cover'             => Storage::disk('public')->url($this->cover),
            'type'              => $this->when($this->relationLoaded('type'), new OrganizationTypeResource($this->type)),
            'category'          => $this->when($this->relationLoaded('category'), new OrganizationCategoryResource($this->category)),
            'socials'           => $this->when($this->relationLoaded('socials'), SocialResource::collection($this->socials)),
            'teams'             => $this->when($this->relationLoaded('teams'), TeamResource::collection($this->teams)),
            'links'             => $this->when($this->relationLoaded('links'), LinkResource::collection($this->links)),
            'users'             => $this->when( in_array('users', $this->validExtras), UserResource::collection($this->teams()->with('users')->get()->pluck('users')->collapse())),
            'user_images'       => $this->when( in_array('user_images', $this->validExtras), $this->teams()->with('users')->limit(5)->get()->pluck('users')->collapse()->pluck('confirmation_code')),
            'user_counts'       => $this->when( in_array('user_counts', $this->validExtras), $this->teams()->with('users')->get()->pluck('users')->collapse()->count()),
            'link'              => $this->when($this->whenPivotLoaded('organization_links', true, false) || $this->whenPivotLoaded('organization_socials', true, false ), optional($this->pivot)->url),
            'created_at'        => optional($this->created_at)->toDateString(),
            'created_by'        => (is_null($this->user_name)) ? optional($this->owner)->first_name : $this->user_name,
        ];
    }


}

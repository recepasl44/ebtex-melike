<?php

namespace App\Http\Resources;


use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;
class FollowResource extends MainResource
{
    protected $relationsArray = ['follower', 'following'];
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
            'follower_id'       => $this->follower_id,
            'following_id'      => $this->following_id,
            'follower'          => $this->when($this->relationLoaded('follower'), new UserResource($this->follower)),
            'following'         => $this->when($this->relationLoaded('following'), new UserResource($this->following)),
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

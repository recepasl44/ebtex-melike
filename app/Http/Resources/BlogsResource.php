<?php

namespace App\Http\Resources;



use App\Http\Resources\MainResources;

class BlogsResource extends MainResource
{
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
            'publish_datetime'  => $this->publish_datetime->format('d/m/Y h:i A'),
            'status'            => $this->status,
            'created_at'        => optional($this->created_at)->toDateString(),
            'created_by'        => (is_null($this->user_name)) ? optional($this->owner)->first_name : $this->user_name,
        ];
    }
}

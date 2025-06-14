<?php

namespace App\Http\Resources;


use App\Http\Resources\MainResources;
class PermissionResource extends MainResource
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
            'display_name'      => $this->display_name,
            'sort'              => $this->sort,
            'created_at'        => $this->created_at->toIso8601String(),
            'updated_at'        => $this->updated_at->toIso8601String(),

        ];
    }
}

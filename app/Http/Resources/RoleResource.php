<?php

namespace App\Http\Resources;


use App\Http\Resources\MainResources;
class RoleResource extends MainResource
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
            'permissions'       => ($this->all) ? 'All' : optional($this->permissions)->pluck('display_name'),
            'number_of_users'   => $this->users->count(),
            'sort'              => $this->sort,
            'status'            => $this->status,
            'created_at'        => $this->created_at->toIso8601String(),
            'updated_at'        => $this->updated_at->toIso8601String(),
        ];
    }
}

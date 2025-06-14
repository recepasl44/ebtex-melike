<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class UserResource extends MainResource
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
            'id'              => $this->id,
            'first_name'      => $this->first_name,
            'last_name'       => $this->last_name,
            'email'           => $this->email,
           'picture'         => $this->getPicture() ?? null,
            'confirmed'       => $this->confirmed,
           'role'            => optional($this->roles()->first())->name,
           'permissions'     => $this->permissions()->get(),
            'status'          => $this->status,
            'directorate_id'  => $this->directorate_id,
            'workshop_id'     => $this->workshop_id,
            'created_at'      => $this->created_at->toIso8601String(),
            'updated_at'      => $this->updated_at->toIso8601String(),
        ];
    }
}

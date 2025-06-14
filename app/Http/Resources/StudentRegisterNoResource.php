<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class StudentRegisterNoResource extends MainResources
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
            'register_no' => $this->max_register_no ? $this->max_register_no + 1 : 10000,
        ];
    }
}

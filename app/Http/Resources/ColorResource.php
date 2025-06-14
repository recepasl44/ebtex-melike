<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use App\Http\Resources\MainResources;

class ColorResource extends MainResource
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
            'hex'               => $this->hex,
            'type_id'           => $this->type_id,
            'created_at'        => optional($this->created_at)->toDateString(),
        ];
    }
}

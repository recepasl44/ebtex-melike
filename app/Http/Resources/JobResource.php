<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class JobResource extends MainResources
{
    /**
         * Transform the resource into an array.
         *
         * @param  \Illuminate\Http\Request
         *
         * @return array
         */
        public function toArray($request)
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'status' => $this->status,
                ];
        }
}

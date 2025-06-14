<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AgreementResource extends MainResources
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
                'id' => $this->id ? new StudentResource($this->id) : null, 
                'name' => $this->name ? new StudentResource($this->name) : null, 
                'path' => $this->path,
                ];
        }
}

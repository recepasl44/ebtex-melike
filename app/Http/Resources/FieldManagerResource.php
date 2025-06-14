<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class FieldManagerResource extends MainResources
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
                'id' => $this->id,
                'method' => $this->method,
                'role_id' => $this->role_id,
                'field' => $this->field,
                'status' => $this->status,
                ];
        }
}

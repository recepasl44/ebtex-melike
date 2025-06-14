<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class InstitutionResource extends MainResources
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
                'type_id' => $this->type_id,
                'name' => $this->name,
                ];
        }
}

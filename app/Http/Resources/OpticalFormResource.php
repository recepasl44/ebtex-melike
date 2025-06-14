<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class OpticalFormResource extends MainResources
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
                'quiz_type_id' => $this->quiz_type_id,
                'quiz_type' => $this->quiz_type,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche,
                'name' => $this->name,
                'attributes' => $this->attributes,
                ];
        }
}

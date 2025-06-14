<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class WeightIndexResource extends MainResources
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
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'height' => $this->height,
                'weight' => $this->weight,
                'indice' => $this->indice,
                ];
        }
}

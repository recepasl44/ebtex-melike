<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ScholarshipApplicationResource extends MainResources
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
                'student' => $this->student ?? null,
                'scholarship_id' => $this->scholarship_id,
                'scholarship' => $this->scholarship ?? null,
                ];
        }
}

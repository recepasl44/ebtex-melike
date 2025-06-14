<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class PointResource extends MainResources
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
                'quiz_id' => $this->quiz_id,
                'student_id' => $this->student_id,
                'point_type_id' => $this->point_type_id,
                'points' => $this->points,
                ];
        }
}

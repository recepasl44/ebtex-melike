<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ServiceStudentResource extends MainResources
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
                'service_id' => $this->service_id,
                'student_id' => $this->student_id,
                ];
        }
}

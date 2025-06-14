<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class DiscountStudentResource extends MainResources
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
                'discount_id' => $this->discount_id,
                'student_id' => $this->student_id,
                ];
        }
}

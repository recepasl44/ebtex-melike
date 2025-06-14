<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class UserDiscountResource extends MainResources
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
                'season_id' => $this->season_id,
                'season' => $this->season ? new SeasonResource($this->season) : null,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche_id ? new BrancheResource($this->branche_id) : null,
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'discount_id' => $this->discount_id,
                'discount' => $this->discount ? new DiscountResource($this->discount) : null,
                'created_by' => $this->created_by,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizTypeResource extends MainResources
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
                'name' => $this->name,
                'penalty_rate' => $this->penalty_rate,
                ];
        }
}

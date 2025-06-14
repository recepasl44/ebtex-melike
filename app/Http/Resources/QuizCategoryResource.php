<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizCategoryResource extends MainResources
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
                'quiz_type_id' => $this->quiz_type_id,
                'quiz_type' => $this->quiz_type ? new QuizTypeResource($this->quiz_type) : null,
                ];
        }
}

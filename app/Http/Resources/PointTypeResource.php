<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class PointTypeResource extends MainResources
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
                'quiz_category_id' => $this->quiz_category_id,
                'quiz_category' => $this->quiz_category ? new QuizCategoryResource($this->quiz_category) : null,
                'content' => $this->content,
                ];
        }
}

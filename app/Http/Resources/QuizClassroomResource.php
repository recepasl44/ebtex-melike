<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizClassroomResource extends MainResources
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
                'quiz' => $this->quiz,
                'quiz_type' => $this->quiz_type,
                'classroom_id' => $this->classroom_id,
                'classroom' => $this->classroom,
                'quiz_level_id' => $this->quiz_level_id,
                'name' => $this->name,
                'quota' => $this->quota,
                'ordered' => $this->ordered,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizCurriculumResource extends MainResources
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
                'type_id' => $this->type_id,
                'lesson_id' => $this->lesson_id,
                'unit_id' => $this->unit_id,
                'chapter_id' => $this->chapter_id,
                'topic_id' => $this->topic_id,
                'achievement_id' => $this->achievement_id,
                'status' => $this->status,
                ];
        }
}

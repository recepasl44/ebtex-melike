<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuestionCurriculumResource extends MainResources
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
                'question_id' => $this->question_id,
                'question' => $this->question,
                'lesson_id' => $this->lesson_id,
                'lesson' => $this->lesson,
                'unit_id' => $this->unit_id,
                'unit' => $this->unit,
                'chapter_id' => $this->chapter_id,
                'chapter' => $this->chapter,
                'topic_id' => $this->topic_id,
                'topic' => $this->topic,
                'achievement_id' => $this->achievement_id,
                'achievement' => $this->achievement,
                'repetition' => $this->repetition,
                'status' => $this->status,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class CorrectAnswerResource extends MainResources
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
                'question' => $this->question ? new QuestionResource($this->question) : null,
                'quiz_id' => $this->quiz_id,
                'quiz' => $this->quiz ? new QuizResource($this->quiz) : null,
                'correct_answer' => $this->correct_answer,
                ];
        }
}

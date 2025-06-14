<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AnswerResource extends MainResources
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
                'quiz' => $this->quiz ? new QuizResource($this->quiz) : null,
                'question_id' => $this->question_id,
                'question' => $this->question ? new QuestionResource($this->question) : null,
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'answer' => $this->answer,
                ];
        }
}

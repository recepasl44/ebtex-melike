<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizStudentResource extends MainResources
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
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'remaining_time' => $this->remaining_time,
                'last_question' => $this->last_question,
                'results' => [
                  'D' => rand(1, 100),
                  'Y' => rand(1, 100),
                  'B' => rand(1, 100),
                ],
                'status' => $this->status,
                ];
        }
}

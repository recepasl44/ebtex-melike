<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizAttendanceResource extends MainResources
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
                'student_id' => $this->user_id,
                'student' => $this->user ? new StudentResource($this->user) : null,
                'is_attendance' => $this->is_attendance,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizBrancheResource extends MainResources
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
                'quiz' => $this->quiz ?? null,
                'student_id' => $this->student_id,
                'student' => $this->student ?? null,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche ?? null,
                'session_id' => $this->session_id,
                'session' => $this->session ?? null,
                ];
        }
}

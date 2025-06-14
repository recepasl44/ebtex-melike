<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\QuizSessions\QuizSession;
use Illuminate\Support\Carbon;

class QuizSessionResource extends MainResources
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
            $date = \Carbon\Carbon::parse($this->session_date ?? $this->created_at);

            return [
                'id' => $this->id,
                'type_id' => $this->type_id,
                'quiz_type' => $this->quiz_type ?? null,
                'quiz_id' => $this->quiz_id,
                'quiz' => $this->quiz ?? null,
                'branche_id' => $this->branche_id,
//                'branche' => $this->branche ?? null,
                'session_date' =>  Carbon::parse($this->session_date)->format('Y-m-d'),
                'sessions' => $this->times ?? null,
                ];
        }
}

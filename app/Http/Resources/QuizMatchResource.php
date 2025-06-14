<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizMatchResource extends MainResources
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
                'quiz_type_id' => $this->quiz_type_id,
                'quiz_type' => $this->quiz_type ?? null,
                'quiz_id' => $this->quiz_id,
                'quiz_' => $this->quiz ?? null,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche ?? null,
                'season_id' => $this->season_id,
                'season' => $this->season ?? null,
                'classroom_id' => $this->classroom_id,
                'classroom' => $this->classroom ?? null,
                'session_id' => $this->session_id,
                'session' => $this->session ?? null,
                'level_id' => $this->level_id,
                'level' => $this->level ?? null,
                'quota' => $this->quota,
                ];
        }
}

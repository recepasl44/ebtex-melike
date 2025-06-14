<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizLevelResource extends MainResources
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
                'level_id' => $this->level_id,
                'level' => $this->level,
                'quiz_id' => $this->quiz_id,
                'type_id' => $this->type_id,
                'time_id' => $this->time_id,
                'quiz' => $this->quiz ?? null,
                'classrooms' => $this->classrooms ?? null,
                ];
        }
}

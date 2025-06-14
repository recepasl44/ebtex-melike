<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class QuizNoteResource extends MainResources
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
                'note' => $this->note,
                'program_id' => $this->program_id,
                'level_id' => $this->level_id,
                'status' => $this->status,
                ];
        }
}

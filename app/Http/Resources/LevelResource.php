<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class LevelResource extends MainResources
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
                'program_id' => $this->program_id,
                'program' => $this->program ? new ProgramResource($this->program) : null,
                'name' => $this->name,
                ];
        }
}

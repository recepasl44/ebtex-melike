<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class CourseResource extends MainResources
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
                'level' => $this->level ? new LevelResource($this->level) : null,
                'name' => $this->name,
                ];
        }
}

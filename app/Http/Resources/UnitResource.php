<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class UnitResource extends MainResources
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
                'name' => $this->name,
                'cover' => $this->cover,
                'lesson_id' => $this->lesson_id,
                'lesson' => $this->lesson ? new LessonResource($this->lesson) : null,
                ];
        }
}

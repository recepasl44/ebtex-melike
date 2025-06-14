<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class TopicResource extends MainResources
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
                'chapter_id' => $this->chapter_id,
                'chapter' => $this->chapter ? new ChapterResource($this->chapter) : null,
                ];
        }
}

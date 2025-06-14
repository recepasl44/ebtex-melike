<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AchievementResource extends MainResources
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
                'topic_id' => $this->topic_id,
                'topic' => $this->topic ? new TopicResource($this->topic) : null
                ];
        }
}

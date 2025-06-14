<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class TaskResource extends MainResources
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
                'user_by' => $this->user_by,
                'user_at' => $this->user_at,
                'task_to' => $this->task_to,
                ];
        }
}

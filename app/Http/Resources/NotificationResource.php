<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class NotificationResource extends MainResources
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
                'title' => $this->title,
                'message' => $this->message,
                'category_id' => $this->category_id,
                'source_id' => $this->source_id,
                'source' => $this->source,
                'sender_id' => $this->sender_id,
                'sender' => $this->sender,
                'send_time' => $this->send_time,
                'status' => $this->status,
                'group_id' => $this->group_id,
                'group' => $this->group,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class MessageResource extends MainResources
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
                'conversation_id' => $this->conversation_id,
                'conversation' => $this->conversation,
                'sender_id' => $this->sender_id,
                'sender' => $this->sender,
                'body' => $this->body,
                'read_at' => $this->read_at,
                'status' => $this->status,
                ];
        }
}

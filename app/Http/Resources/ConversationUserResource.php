<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ConversationUserResource extends MainResources
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
                'user_id' => $this->user_id,
                'user' => $this->user,
                ];
        }
}

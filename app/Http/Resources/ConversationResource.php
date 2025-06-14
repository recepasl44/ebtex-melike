<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ConversationResource extends MainResources
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
                'type_id' => $this->name,
                'user_one_id' => $this->user_one_id,
                'user_one' => $this->userOne,
                'user_two_id' => $this->user_two_id,
                'user_two' => $this->userTwo,
                ];
        }
}

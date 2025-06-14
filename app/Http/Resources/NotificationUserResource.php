<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class NotificationUserResource extends MainResources
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
                'notification_id' => $this->notification_id,
                'notification' => $this->notification,
                'user_id' => $this->user_id,
                'user' => $this->user,
                'read_at' => $this->read_at,
                ];
        }
}

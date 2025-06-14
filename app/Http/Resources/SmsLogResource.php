<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class SmsLogResource extends MainResources
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
                'user_id' => $this->user_id,
                'provider' => $this->provider,
                'phone' => $this->phone,
                'message' => $this->message,
                'provider' => $this->provider,
                'status' => $this->status,
                'response' => $this->response,
                ];
        }
}

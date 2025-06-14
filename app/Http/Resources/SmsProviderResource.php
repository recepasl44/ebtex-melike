<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class SmsProviderResource extends MainResources
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
                'username' => $this->username,
                'password' => $this->password,
                'api_key' => $this->api_key,
                'api_secret' => $this->api_secret,
                'origin' => $this->origin,
                ];
        }
}

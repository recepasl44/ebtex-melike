<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class SocialTypeResource extends MainResources
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
                'name' => $this->name,
                ];
        }
}

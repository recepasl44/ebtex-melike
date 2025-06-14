<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class CountyResource extends MainResources
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
                'city_id' => $this->city_id,
                'city' => $this->city ? new CityResource($this->city) : null,
                ];
        }
}

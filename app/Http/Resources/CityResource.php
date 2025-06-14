<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class CityResource extends MainResources
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
                'country_id' => $this->country_id,
                'country' => $this->country ? new CountryResource($this->country) : null,
                'name' => $this->name,
                ];
        }
}

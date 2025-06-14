<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class SchoolResource extends MainResources
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
                'country_id' => $this->country_id,
                'country' => $this->country ? new CountryResource($this->country) : null,
                'city_id' => $this->city_id,
                'city' => $this->city ? new CityResource($this->city) : null,
                'county_id' => $this->county_id,
                'county' => $this->county ? new CountryResource($this->county) : null,
                'code' => $this->code,
                'website' => $this->website,
                'address' => $this->address,
                'phone' => $this->phone,
                'email' => $this->email,
                'fax' => $this->fax,
                'additional_information' => $this->additional_information,
                'type_id' => $this->type_id,
                'type' => $this->type ? new SchoolTypeResource($this->type) : null,
                ];
        }
}

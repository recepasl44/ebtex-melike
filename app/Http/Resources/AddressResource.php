<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AddressResource extends MainResources
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
//                'addressable_id' => $this->addressable_id,
//                'addressable_type' => $this->addressable_type,
                'country_id' => $this->country_id,
                'country' => $this->country ? new CountryResource($this->country) : null,
                'city_id' => $this->city_id,
                'city' => $this->city ? new CityResource($this->city) : null,
                'county_id' => $this->county_id,
                'county' => $this->county ? new CountyResource($this->county) : null,
                'district_id' => $this->district_id,
                'district' => $this->district ? new DistrictResource($this->district) : null,
                'neighborhood_id' => $this->neighborhood_id,
                'neighborhood' => $this->neighborhood ? new NeighborhoodResource($this->neighborhood) : null,
                'address' => $this->address,
                ];
        }
}

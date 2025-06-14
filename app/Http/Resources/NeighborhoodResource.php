<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class NeighborhoodResource extends MainResources
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
                'district_id' => $this->district_id,
                'district' => $this->district ? new DistrictResource($this->district) : null,
                'name' => $this->name,
                'zip_code' => $this->zip_code,
                ];
        }
}

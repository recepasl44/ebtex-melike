<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class DistrictResource extends MainResources
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
                'county_id' => $this->county_id,
                'county' => $this->county ? new CountyResource($this->county) : null,
                'name' => $this->name,
                ];
        }
}

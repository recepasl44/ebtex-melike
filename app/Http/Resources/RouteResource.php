<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class RouteResource extends MainResources
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
                'vehicle_id' => $this->vehicle_id,
                'name' => $this->name,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ServiceStopResource extends MainResources
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
                'route_id' => $this->route_id,
                'route' => $this->route,
                'name' => $this->name,
                'lat' => $this->lat,
                'long' => $this->long,
                ];
        }
}

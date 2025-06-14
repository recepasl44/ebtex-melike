<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ServicePlanResource extends MainResources
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
                'vehicle' => $this->vehicle,
                'driver_id' => $this->driver_id,
                'driver' => $this->driver,
                'session_id' => $this->session_id,
                'route_id' => $this->route_id,
                'route' => $this->route,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'passengers' => $this->passengers,
                'status' => $this->status,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class VehicleResource extends MainResources
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
                'plate_no' => $this->plate_no,
                'model_id' => $this->model_id,
                'model_year' => $this->model_year,
                'owner' => $this->owner,
                'driver_id' => $this->driver_id,
                'vin' => $this->vin,
                'check_date' => $this->check_date,
                'insurance_date' => $this->insurance_date,
                'mtv_date' => $this->mtv_date,
                'capacity' => $this->capacity,
                'status' => $this->status,
                'lat' => $this->lat,
                'long' => $this->long,
                ];
        }
}

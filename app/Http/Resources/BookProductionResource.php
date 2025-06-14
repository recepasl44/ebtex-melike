<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookProductionResource extends MainResources
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
                'production_status_id' => $this->production_status_id,
                'distribution_status_id' => $this->distribution_status_id,
                'delivery_status_id' => $this->delivery_status_id,
                'cargo_tracking_number' => $this->cargo_tracking_number,
                ];
        }
}

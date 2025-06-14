<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class DiscountResource extends MainResources
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
                'is_seasonal' => $this->is_seasonal,
                'type' => $this->type,
                'discount_type' => $this->discount_type,
                'service_id' => $this->service_id,
                'service' => $this->service ? new ServiceResource($this->service) : null,
                'amount' => $this->amount,
                ];
        }
}

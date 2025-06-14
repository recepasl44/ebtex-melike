<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class CurrencyResource extends MainResources
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
            'code' => $this->code,
            'symbol' => $this->symbol,
            'decimal_places' => $this->decimal_places,
            'exchange_rate' => $this->exchange_rate,
            'status' => $this->status,
        ];
    }
}

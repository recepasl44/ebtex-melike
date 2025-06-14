<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class PlatformResource extends MainResources
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
                'owner_name' => $this->owner_name,
                'phone' => $this->phone,
                'gsm' => $this->gsm,
                'status' => $this->status,
                'domain' => $this->domain ? $this->domain->first() : null,
                'logo' =>  $this->settings ? $this->settings->first()->logo : null
            ];
        }
}

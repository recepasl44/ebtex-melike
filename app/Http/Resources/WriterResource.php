<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class WriterResource extends MainResources
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
                'full_name' => $this->full_name,
                ];
        }
}

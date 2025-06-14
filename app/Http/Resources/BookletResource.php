<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookletResource extends MainResources
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
                'booklet_type_id' => $this->booklet_type_id,
                'booklet_type' => $this->booklet_type ? new BookletTypeResource($this->booklet_type) : null,
                ];
        }
}

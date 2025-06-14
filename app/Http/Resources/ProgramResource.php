<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ProgramResource extends MainResources
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
                'category_id' => $this->category_id,
                'category' => $this->category?->name,
                ];
        }
}

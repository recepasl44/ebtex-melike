<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BrancheResource extends MainResources
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
                'created_by' => $this->created_by,
                'type' => $this->type,
                ];
        }
}

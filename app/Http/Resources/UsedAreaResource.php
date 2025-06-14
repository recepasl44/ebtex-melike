<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class UsedAreaResource extends MainResources
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
                'group_type_id' => $this->group_type_id,
                'group_type' => $this->group_type,
                ];
        }
}

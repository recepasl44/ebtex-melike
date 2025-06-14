<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ComponentValueResource extends MainResources
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
                'lang' => $this->lang,
                'component_id' => $this->component_id,
                'values' => $this->values,
                ];
        }
}

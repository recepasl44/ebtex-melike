<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ClassResource extends MainResources
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
                'branch' => $this->branch,
                'name' => $this->name,
                'level' => $this->level,
                ];
        }
}

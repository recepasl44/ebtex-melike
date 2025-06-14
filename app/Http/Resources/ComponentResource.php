<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ComponentResource extends MainResources
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
                'cover' => $this->cover,
                'file' => $this->file,
                'variables' => $this->variables,
                ];
        }
}

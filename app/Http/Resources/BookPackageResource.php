<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class BookPackageResource extends MainResources
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
                'default_total_questions' => $this->default_total_questions,
                'default_standard' => $this->default_standard,
                'default_flexible' => $this->default_flexible,
                ];
        }
}

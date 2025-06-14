<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ChapterResource extends MainResources
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
                'unit_id' => $this->unit_id,
                'unit' => $this->unit ? new UnitResource($this->unit) : null,
                ];
        }
}

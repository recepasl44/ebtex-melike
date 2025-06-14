<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ScholarshipResource extends MainResources
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
                'short_name' => $this->short_name,
                'name' => $this->name,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche_,
                'season_id' => $this->season_id,
                'season' => $this->season,
                'duration' => $this->duration,
                'created_by' => $this->created_by,
                'status' => $this->status,
                ];
        }
}

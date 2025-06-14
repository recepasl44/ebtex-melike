<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ScolarshipAssignResource extends MainResources
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
                'scholarship_id' => $this->scholarship_id,
                'branche_id' => $this->branche_id,
                'season_id' => $this->season_id,
                'classroom_id' => $this->classroom_id,
                'session_id' => $this->session_id,
                'level_id' => $this->level_id,
                'quota' => $this->quota,
                ];
        }
}

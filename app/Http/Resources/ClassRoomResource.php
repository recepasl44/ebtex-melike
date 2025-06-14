<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ClassRoomResource extends MainResources
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
                'branche_id' => $this->branche_id,
                'branche' => $this->branche ? new BrancheResource($this->branche) : null,
                'school_id' => $this->school_id,
                'school' => $this->school ? new SchoolResource($this->school) : null,
                'level_id' => $this->level_id,
                'quota'=> $this->quota,
                'level' => $this->level ? new LevelResource($this->level) : null,
                ];
        }
}

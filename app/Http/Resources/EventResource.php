<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class EventResource extends MainResources
{
    /**
         * Transform the resource into an array.
         *
         * @param  \Illuminate\Http\Request
         *
         * @return array
         */
        public function toArray($request)
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'type_id' => $this->type_id,
                'type' => $this->type,
                'group_type_id' => $this->group_type_id,
                'group_type' => $this->grouptype,
                'group_id' => $this->group_id,
                'group' => $this->group,
                'program_id' => $this->program_id,
                'program' => $this->program,
                'level_id' => $this->level_id,
                'level' => $this->level,
                'used_area_id' => $this->used_area_id,
                'used_area' => $this->usedarea,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'duty_teacher_id' => $this->duty_teacher_id,
                'duty_teacher' => $this->duty_teacher,
                'status' => $this->status,
                ];
        }
}

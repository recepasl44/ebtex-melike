<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AttendanceResource extends MainResources
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
                'group_type' => $this->grouptype,
                'group_id' => $this->group_id,
                'group' => $this->group,
                'program_id' => $this->program_id,
                'program' => $this->program,
                'level_id' => $this->level_id,
                'level' => $this->level,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'start_time' => $this->start_time,
                'used_area_id' => $this->used_area_id,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'responsible_id' => $this->responsible_id,
                'responsible' => $this->responsible,
                'duty_teacher_id' => $this->duty_teacher_id,
                'duty_teacher' => $this->duty_teacher,
                'duty_user_id' => $this->duty_user_id,
                'duty_user' => $this->duty_user,
                'used_area' => $this->used_area,
                'students' => $this->students,
                'teachers' => $this->teachers,
                'days' => $this->days,
                'status' => $this->status,
                ];
        }
}

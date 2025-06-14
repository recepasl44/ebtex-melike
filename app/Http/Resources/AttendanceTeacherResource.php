<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AttendanceTeacherResource extends MainResources
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
                'attendance_id' => $this->attendance_id,
                'attendance' => $this->attendance,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'status' => $this->status,
                'admin_status' => $this->admin_status,
                ];
        }
}

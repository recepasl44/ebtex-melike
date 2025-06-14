<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class EmployeeAcademicResource extends MainResources
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
                'employee_id' => $this->employee_id,
                'employee' => $this->employee,
                'education_status_id' => $this->education_status_id,
                'education_status' => $this->educationstatus,
                'job_id' => $this->job_id,
                'job' => $this->job,
                'profession_id' => $this->profession_id,
                'profession' => $this->profession,
                'academic_title_id' => $this->academic_title_id,
                'academic_title' => $this->academictitle,
                'experience' => $this->experience,
                'certificates' => $this->certificates,
                'program_id' => $this->program_id,
                'program' => $this->program_id,
                'level_id' => $this->level_id,
                'level' => $this->level,
                ];
        }
}

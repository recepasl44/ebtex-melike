<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class AssignmentStudentResource extends MainResources
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
                'assignment_id' => $this->assignment_id,
                'assignment' => $this->assignment,
                'student_id' => $this->student_id,
                'student' => $this->student,
                'completion_percentage' => $this->completion_percentage,
                'delay_days' => $this->delay_days,
                'student_file' => $this->student_file,
                'status' => $this->status,
                ];
        }
}

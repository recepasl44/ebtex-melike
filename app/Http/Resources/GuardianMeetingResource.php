<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class GuardianMeetingResource extends MainResources
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
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'guardian_id' => $this->guardian_id,
                'guardian' => $this->guardian,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'subject' => $this->subject,
                'suggestions' => $this->suggestions,
                'guardian_requests' => $this->guardian_requests,
                'satisfaction_status' => $this->satisfaction_status,
                'meeting_type' => $this->meeting_type,
                'meeting_date' => $this->meeting_date,
                'notes' => $this->notes,
                'status' => $this->status,
                ];
        }
}

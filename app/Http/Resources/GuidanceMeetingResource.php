<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class GuidanceMeetingResource extends MainResources
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
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'meeting_topic' => $this->meeting_topic,
                'meeting_type' => $this->meeting_type,
                'guidance_name' => $this->guidance_name,
                'meeting_notes' => $this->meeting_notes,
                'meeting_date' => $this->meeting_date,
                'meeting_duration' => $this->meeting_duration,
                'status' => $this->status,
                ];
        }
}

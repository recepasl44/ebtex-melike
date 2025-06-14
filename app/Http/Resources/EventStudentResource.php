<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class EventStudentResource extends MainResources
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
                'event_id' => $this->event_id,
                'event' => $this->event,
                'student_id' => $this->student_id,
                'student' => $this->student,
                'status' => $this->status,
                ];
        }
}

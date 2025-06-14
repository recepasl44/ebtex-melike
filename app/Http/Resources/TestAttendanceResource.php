<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class TestAttendanceResource extends MainResources
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
                'test_id' => $this->test_id,
                'student_id' => $this->user_id,
                'student' => $this->user ? new StudentResource($this->user) : null,
                'is_attendance' => $this->is_attendance,
                ];
        }
}

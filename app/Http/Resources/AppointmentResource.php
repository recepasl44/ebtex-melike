<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Students\Student;

class AppointmentResource extends MainResources
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
                'season_id' => $this->season_id,
                'season' => $this->quiz ? new QuizResource($this->quiz) : null,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche ? new BrancheResource($this->branche) : null,
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'type_id' => $this->type_id,
                'type' => $this->type ?? null,
                'meeting_date' => $this->meeting_date,
                'meeting_note' => $this->meeting_note,
'source' => $this->student
    ? (Student::where('identification_no', $this->student->identification_no)->count() > 1 
        ? 'inside' 
        : 'outside')
    : null,                'meeting_by' => $this->meetingby ?? null,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Students\Student;

class MeetingResource extends MainResources
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
                'season' => $this->season ? new SeasonResource($this->season) : null,
                'branche_id' => $this->branche_id,
                'branche' => $this->branche ? new BrancheResource($this->branche) : null,
                'student_id' => $this->student_id,
                'student' => $this->student ? new StudentResource($this->student) : null,
                'type_id' => $this->type_id,
                'type' => $this->type ?? null,
                'meeting_date' => $this->meeting_date,
                'created_by' => $this->created_by,
                'meeting_note' => $this->meeting_note,
                'meeting_by' => $this->meetingby,
                'meeting_date_start' => $this->meeting_date_start,
                'meeting_date_end' => $this->meeting_date_end,
'source' => $this->student
    ? (Student::where('identification_no', $this->student->identification_no)->count() > 1 
        ? 'inside' 
        : 'outside')
    : null,                ];
        }
}

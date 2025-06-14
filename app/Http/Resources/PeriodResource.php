<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class PeriodResource extends MainResources
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
                'period_no' => $this->period_no,
                'student_id' => $this->student_id,
                'student' => $this->student,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'name' => $this->name ?? $this->start_date.' - '.$this->end_date,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,

                ];
        }
}

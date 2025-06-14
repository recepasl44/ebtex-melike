<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class GuidanceObservationResource extends MainResources
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
                'lesson_id' => $this->lesson_id,
                'lesson' => $this->lesson,
                'teacher_id' => $this->teacher_id,
                'teacher' => $this->teacher,
                'title' => $this->title,
                'description' => $this->description,
                'status' => $this->status,
                'observation_date' => $this->observation_date,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class StudentPsychologicalResource extends MainResources
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
                'student' => $this->student,
                'psychological_support' => $this->psychological_support,
                'emotional_reactions' => $this->emotional_reactions,
                'activity_participation' => $this->activity_participation,
                'communication_skills' => $this->communication_skills,
                ];
        }
}

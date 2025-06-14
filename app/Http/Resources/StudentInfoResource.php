<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Students\Student;

class StudentInfoResource extends MainResources
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
                'birthplace' => $this->birthplace,
                'medical_support' => $this->medical_support,
                'special_conditions' => $this->special_conditions,
                'extracurricular_activities' => $this->extracurricular_activities,
                'hobbies_and_skills' => $this->hobbies_and_skills,
                'residential_address' => $this->residential_address,
                'transportation_status' => $this->transportation_status,
                'emergency_contact_info' => $this->emergency_contact_info,
                'number_of_siblings' => $this->number_of_siblings,
                'birth_order' => $this->birth_order,
                'chronic_illness' => $this->chronic_illness,
                'household_members' => $this->household_members,
                'psychological_status' => $this->psychological_status,
                'academic_performance' => $this->academic_performance,
                'support_educations' => $this->support_educations,
                'additional_notes' => $this->additional_notes,
                ];
        }
}

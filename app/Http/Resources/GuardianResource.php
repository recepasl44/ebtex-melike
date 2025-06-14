<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class GuardianResource extends MainResources
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
                'is_alive' => $this->is_alive,
                'is_parent' => $this->is_parent,
                'is_divorced' => $this->is_divorced,
                'identification_no' => $this->identification_no,
                'full_name' => $this->full_name,
                'phone' => $this->phone,
                'profession' => $this->profession,
                'home_phone' => $this->home_phone,
                'work_phone' => $this->work_phone,
                'address' => $this->address,
                'work_address' => $this->work_address,
                'birthday' => $this->birthday,
                'birthplace' => $this->birthplace,
                'workplace' => $this->workplace,
                'email' => $this->email,
                'wedding_anniversary' => $this->wedding_anniversary,
                'student_id' => $this->student_id,
//                'student' => $this->student ? new StudentResource($this->student) : null,
                'kinship_id' => $this->kinship_id,
                'kinship' => $this->kinship,
                'health' => $this->health,
                'education' => $this->education,
                ];
        }
}

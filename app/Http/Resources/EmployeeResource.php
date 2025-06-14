<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class EmployeeResource extends MainResources
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
                'full_name' => $this->full_name,
                'identification_no' => $this->identification_no,
                'birth_day' => $this->birth_day,
                'type_id' => $this->type_id,
                'type' => $this->employeetype,
                'email' => $this->email,
                'phone_number' => $this->phone_number,
                'address' => $this->address,
                'gender_id' => $this->gender_id,
                'status' => $this->status,
                ];
        }
}

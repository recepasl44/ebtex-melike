<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ScholarshipDocumentResource extends MainResources
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
                'scholarship_id' => $this->scholarship_id,
                'scholarship' => $this->scholarship,
                'campus_name' => $this->campus_name,
                'building_name' => $this->building_name,
                'hall_name' => $this->hall_name,
                'hall_date' => $this->hall_date,
                'hall_session' => $this->hall_session,
                'duration' => $this->duration,
                'program_id' => $this->program_id,
                'level_id' => $this->level_id,
                'school_id' => $this->school_id,
                'phone' => $this->phone,
                'birth_date' => $this->birth_date,
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'identity_no' => $this->identity_no,
                'gender' => $this->gender,
                'payment_status' => $this->payment_status,
                'payment_receipt' => $this->payment_receipt,
                ];
        }
}

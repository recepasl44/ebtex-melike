<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ScholarshipSettingResource extends MainResources
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
                'scholarship' => $this->scholarship ?? null,
                'display_status' => $this->display_status,
                'class_appointment' => $this->class_appointment,
                'application_received_sms' => $this->application_received_sms,
                'phone_verification' => $this->phone_verification,
                'own_student_registration' => $this->own_student_registration,
                'scholarship_rate' => $this->scholarship_rate,
                'result_score' => $this->result_score,
                'result_sorting' => $this->result_sorting,
                'exam_price_status' => $this->exam_price_status,
                'exam_price' => $this->exam_price,
                'information_document' => $this->information_document,
                'specification' => $this->specification,
                'doc_announcement_date' => $this->doc_announcement_date,
                'bank_name' => $this->bank_name,
                'bank_branch_code' => $this->bank_branch_code,
                'bank_account_number' => $this->bank_account_number,
                'bank_account_type' => $this->bank_account_type,
                'payment_receipt' => $this->payment_receipt,
                ];
        }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class PaymentResource extends MainResources
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
                'student_id' => $this->student_id,
//                'student' => $this->student ? new StudentResource($this->student) : null,
                'installment_id' => $this->installment_id,
                'installment' => $this->installment ? new InstallmentResource($this->installment) : null,
                'amount_paid' => $this->amount_paid,
                'payment_date' => $this->payment_date,
                'payment_method' => $this->payment_method,
                ];
        }
}

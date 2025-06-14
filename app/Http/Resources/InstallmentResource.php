<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class InstallmentResource extends MainResources
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
            'enrollment_id' => $this->enrollment_id,
            // 'enrollment' => $this->enrollment ? new EnrollmentResource($this->enrollment) : null,
            'amount' => $this->amount,
            'order_no' => $this->order_no,
            'due_date' => $this->due_date,
            'is_paid' => $this->is_paid,
            'payment_date' => $this->payment_date,
        ];
    }
}

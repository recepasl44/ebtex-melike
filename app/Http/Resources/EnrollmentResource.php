<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Discounts\Discount;
use App\Models\DiscountStudents\DiscountStudent;

class EnrollmentResource extends MainResources
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
        $ud = DiscountStudent::where('student_id', $this->student_id)->pluck('discount_id')->toArray();
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            // 'student' => $this->student ? new StudentResource($this->student) : null,
            'service_id' => $this->service_id,
            'service' => $this->service ? new ServiceResource($this->service) : null,
            'installments' => $this->installments ? InstallmentResource::collection($this->installments) : null,
            'total_fee' => $this->total_fee,
            'discount_amount' => $this->discount,
            'discounts' => Discount::where('service_id', $this->service_id)->whereIn('id', $ud)->get(),
            'final_fee' => $this->final_fee,
            'advance_fee' => $this->advance_fee,
            'remaining_fee' => $this->remaining_fee,
            'status' => $this->status,
        ];
    }
}

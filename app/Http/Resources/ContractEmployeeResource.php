<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ContractEmployeeResource extends MainResources
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
                'employee_id' => $this->employee_id,
                'employee' => $this->employee,
                'contract_type_id' => $this->contract_type_id,
                'contract_type' => $this->contracttype,
                'work_days' => $this->work_days,
                'fixed_salary' => $this->fixed_salary,
                'number_of_lessons' => $this->number_of_lessons,
                'lesson_price' => $this->lesson_price,
                'day_price' => $this->day_price,
                'solution_price' => $this->solution_price,
                'coaching_price' => $this->coaching_price,
                'private_lesson_price' => $this->private_lesson_price,
                'coupon_rate' => $this->coupon_rate,
                'start_date' => $this->start_date,
                'end_date' => $this->end_date,
                'notes' => $this->notes,
                ];
        }
}

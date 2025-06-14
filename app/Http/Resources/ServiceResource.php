<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;

class ServiceResource extends MainResources
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
            'branche_id' => $this->branche_id,
            'branche' => $this->branche ? new BrancheResource($this->branche) : null,
            'level_id' => $this->level_id,
            'level' => $this->level ? new LevelResource($this->level) : null,
            'course_id' => $this->course_id,
            'course' => $this->course ? new CourseResource($this->course) : null,
            'program_id' => $this->program_id,
            'program' => $this->program ? new ProgramResource($this->program) : null,
            'type_id' => $this->type_id,
            'type' => $this->type ? new ServiceTypeResource($this->type) : null,
            'start_installment_date' => $this->start_installment_date,
            'end_installment_date' => $this->end_installment_date,
            'name' => $this->name,
            'price' => $this->price,
            'is_main' => $this->is_main,
            'max_installments' => $this->max_installments,
            'max_discounts' => $this->max_discounts,
            'accept_discount' => $this->accept_discount,
            'vat_rate' => $this->vat_rate,
        ];
    }
}

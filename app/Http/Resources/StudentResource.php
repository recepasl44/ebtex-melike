<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use Illuminate\Support\Facades\Storage;

class StudentResource extends MainResources
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
            'season_id' => $this->season_id,
            'season' => $this->season ? new SeasonResource($this->season) : null,
            'nationality_id' => $this->nationality_id,
            'nationality' => $this->nationality ? new CountryResource($this->nationality) : null,
            'identification_no' => $this->identification_no,
            'gender_id' => $this->gender_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'birthday' => $this->birthday,
            'program_id' => $this->program_id,
            'program' => $this->program ? new ProgramResource($this->program) : null,
            'level_id' => $this->level_id,
            'level' => $this->level ? new LevelResource($this->level) : null,
            'course_id' => $this->course_id,
            'course' => $this->course ? new CourseResource($this->course) : null,
            'school_id' => $this->school_id,
            'school' => $this->school ? new SchoolResource($this->school) : null,
            'email' => $this->email,
            'phone' => $this->phone,
            'mobile_phone' => $this->mobile_phone,
            'address_id' => $this->address_id,
            'address' => $this->address ? new AddressResource($this->address) : null,
            'parent_id' => $this->parent_id,
            'parent' => $this->guardian ? new GuardianResource($this->guardian) : null,
            'financial_status' => $this->financial_status,
            'additional_information_1' => $this->additional_information_1,
            'additional_information_2' => $this->additional_information_2,
            'class_teacher' => $this->class_teacher ?? null,
            'advisor_teacher' => $this->advisor_teacher ?? null,
            'guide_teacher' => $this->guide_teacher ?? null,
            'created_by' => $this->created_by,
            'status' => $this->status ?? 0,
            'enrollments' => $this->enrollments ? EnrollmentResource::collection($this->enrollments): null,
            'payments' => $this->payments ? PaymentResource::collection($this->payments): null,
            'profile_picture' => Storage::disk('public')->url($this->profile_picture),
            'contract_no' =>$this->agreements ? AgreementResource::collection($this->agreements): null,
        ];
    }
}

<?php

namespace App\Http\Responses\Backend\Payments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Installments\Installment;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$installments= collect(Installment::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.payments.create',compact('students', 'installments', ));
    }
}
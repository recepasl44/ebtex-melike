<?php

namespace App\Http\Responses\Backend\Payments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Installments\Installment;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Payments\Payment
     */
    protected $payments;

    /**
     * @param App\Models\Payments\Payment $payments
     */
    public function __construct($payments)
    {
        $this->payments = $payments;
    }

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
        return view('backend.payments.edit',compact('students', 'installments', ))->with([
            'payments' => $this->payments
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\PaymentMethods;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\PaymentMethods\PaymentMethod
     */
    protected $paymentmethods;

    /**
     * @param App\Models\PaymentMethods\PaymentMethod $paymentmethods
     */
    public function __construct($paymentmethods)
    {
        $this->paymentmethods = $paymentmethods;
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
        
        return view('backend.paymentmethods.edit',)->with([
            'paymentmethods' => $this->paymentmethods
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\PaymentStatuses;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\PaymentStatuses\PaymentStatus
     */
    protected $paymentstatuses;

    /**
     * @param App\Models\PaymentStatuses\PaymentStatus $paymentstatuses
     */
    public function __construct($paymentstatuses)
    {
        $this->paymentstatuses = $paymentstatuses;
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
        
        return view('backend.paymentstatuses.edit',)->with([
            'paymentstatuses' => $this->paymentstatuses
        ]);
    }
}
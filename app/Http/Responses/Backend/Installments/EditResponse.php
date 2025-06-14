<?php

namespace App\Http\Responses\Backend\Installments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Enrollments\Enrollment;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Installments\Installment
     */
    protected $installments;

    /**
     * @param App\Models\Installments\Installment $installments
     */
    public function __construct($installments)
    {
        $this->installments = $installments;
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
        $enrollments= collect(Enrollment::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.installments.edit',compact('enrollments', ))->with([
            'installments' => $this->installments
        ]);
    }
}
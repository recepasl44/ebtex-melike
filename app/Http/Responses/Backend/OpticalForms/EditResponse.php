<?php

namespace App\Http\Responses\Backend\OpticalForms;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OpticalForms\OpticalForm
     */
    protected $opticalforms;

    /**
     * @param App\Models\OpticalForms\OpticalForm $opticalforms
     */
    public function __construct($opticalforms)
    {
        $this->opticalforms = $opticalforms;
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
        
        return view('backend.opticalforms.edit',)->with([
            'opticalforms' => $this->opticalforms
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\TestTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\TestTypes\TestType
     */
    protected $testtypes;

    /**
     * @param App\Models\TestTypes\TestType $testtypes
     */
    public function __construct($testtypes)
    {
        $this->testtypes = $testtypes;
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
        
        return view('backend.testtypes.edit',)->with([
            'testtypes' => $this->testtypes
        ]);
    }
}
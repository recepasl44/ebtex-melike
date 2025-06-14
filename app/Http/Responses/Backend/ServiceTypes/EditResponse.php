<?php

namespace App\Http\Responses\Backend\ServiceTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ServiceTypes\ServiceType
     */
    protected $servicetypes;

    /**
     * @param App\Models\ServiceTypes\ServiceType $servicetypes
     */
    public function __construct($servicetypes)
    {
        $this->servicetypes = $servicetypes;
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
        
        return view('backend.servicetypes.edit',)->with([
            'servicetypes' => $this->servicetypes
        ]);
    }
}
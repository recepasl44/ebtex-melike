<?php

namespace App\Http\Responses\Backend\VehicleTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\VehicleTypes\VehicleType
     */
    protected $vehicletypes;

    /**
     * @param App\Models\VehicleTypes\VehicleType $vehicletypes
     */
    public function __construct($vehicletypes)
    {
        $this->vehicletypes = $vehicletypes;
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
        
        return view('backend.vehicletypes.edit')->with([
            'vehicletypes' => $this->vehicletypes
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\VehicleEngines;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\VehicleEngines\VehicleEngine
     */
    protected $vehicleengines;

    /**
     * @param App\Models\VehicleEngines\VehicleEngine $vehicleengines
     */
    public function __construct($vehicleengines)
    {
        $this->vehicleengines = $vehicleengines;
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
        
        return view('backend.vehicleengines.edit')->with([
            'vehicleengines' => $this->vehicleengines
        ]);
    }
}
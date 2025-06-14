<?php

namespace App\Http\Responses\Backend\VehicleBrands;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\VehicleBrands\VehicleBrand
     */
    protected $vehiclebrands;

    /**
     * @param App\Models\VehicleBrands\VehicleBrand $vehiclebrands
     */
    public function __construct($vehiclebrands)
    {
        $this->vehiclebrands = $vehiclebrands;
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
        
        return view('backend.vehiclebrands.edit')->with([
            'vehiclebrands' => $this->vehiclebrands
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Insurances;

use App\Models\Insurers\Insurer;
use Illuminate\Contracts\Support\Responsable;
use App\Models\Vehicles\Vehicle;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $vehicles=collect(Vehicle::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['plate']];
        });
        $insurers=collect(Insurer::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        
        return view('backend.insurances.create',compact('vehicles', 'insurers'));
    }
}
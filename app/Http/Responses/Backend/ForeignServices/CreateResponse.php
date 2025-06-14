<?php

namespace App\Http\Responses\Backend\ForeignServices;

use App\Models\Services\Service;
use App\Models\Vehicles\Vehicle;
use Illuminate\Contracts\Support\Responsable;


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
        $vehicles = Vehicle::all()->pluck('plate', 'id');
        $services = Service::all()->pluck('name', 'id');
        $statuses = collect([
            0 => _tr('to_foreign_service'),
            1 => _tr('to_workshop'),
        ]);
        
        return view('backend.foreignservices.create',compact('vehicles', 'statuses', 'services'));
    }
}
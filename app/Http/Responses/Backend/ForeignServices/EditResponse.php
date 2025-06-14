<?php

namespace App\Http\Responses\Backend\ForeignServices;

use App\Models\Services\Service;
use App\Models\Vehicles\Vehicle;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ForeignServices\ForeignService
     */
    protected $foreignservices;

    /**
     * @param App\Models\ForeignServices\ForeignService $foreignservices
     */
    public function __construct($foreignservices)
    {
        $this->foreignservices = $foreignservices;
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
        $vehicles = Vehicle::all()->pluck('plate', 'id');
        $services = Service::all()->pluck('name', 'id');
        $statuses = collect([
            0 => _tr('to_foreign_service'),
            1 => _tr('to_workshop')
        ]);
        return view('backend.foreignservices.edit',compact('vehicles', 'statuses', 'services'))->with([
            'foreignservices' => $this->foreignservices
        ]);
    }
}
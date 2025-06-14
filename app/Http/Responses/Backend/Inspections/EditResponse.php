<?php

namespace App\Http\Responses\Backend\Inspections;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Vehicles\Vehicle;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Inspections\Inspection
     */
    protected $inspections;

    /**
     * @param App\Models\Inspections\Inspection $inspections
     */
    public function __construct($inspections)
    {
        $this->inspections = $inspections;
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
        $vehicles=collect(Vehicle::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['plate']];
                });
        return view('backend.inspections.edit',compact('vehicles', ))->with([
            'inspections' => $this->inspections
        ]);
    }
}
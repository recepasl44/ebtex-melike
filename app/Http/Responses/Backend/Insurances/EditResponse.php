<?php

namespace App\Http\Responses\Backend\Insurances;

use App\Models\Insurers\Insurer;
use Illuminate\Contracts\Support\Responsable;
use App\Models\Vehicles\Vehicle;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Insurances\Insurance
     */
    protected $insurances;

    /**
     * @param App\Models\Insurances\Insurance $insurances
     */
    public function __construct($insurances)
    {
        $this->insurances = $insurances;
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
        $insurers=collect(Insurer::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.insurances.edit',compact('vehicles', 'insurers'))->with([
            'insurances' => $this->insurances
        ]);
    }
}
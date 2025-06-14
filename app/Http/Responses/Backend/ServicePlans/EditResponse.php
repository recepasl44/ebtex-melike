<?php

namespace App\Http\Responses\Backend\ServicePlans;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Vehicles\Vehicle;
use App\Models\Routes\Route;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ServicePlans\ServicePlan
     */
    protected $serviceplans;

    /**
     * @param App\Models\ServicePlans\ServicePlan $serviceplans
     */
    public function __construct($serviceplans)
    {
        $this->serviceplans = $serviceplans;
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
        $vehicles= collect(Vehicle::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$routes= collect(Route::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.serviceplans.edit',compact('vehicles', 'routes', ))->with([
            'serviceplans' => $this->serviceplans
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Plans;

use App\Models\Vehicles\Vehicle;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Plans\Plan
     */
    protected $plans;

    /**
     * @param App\Models\Plans\Plan $plans
     */
    public function __construct($plans)
    {
        $this->plans = $plans;
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
        $vehicles = collect(Vehicle::with('type')->get()->toArray())->filter(function (array $item) {
            return (isset($item['type']['show_on_plan']) && $item['type']['show_on_plan'] > 0);
        })->mapWithKeys(function ($item) {
                return [$item['id'] => $item['plate']];
        });

        $statuses = collect([
            0 => _tr('uncompleted'),
            1 => _tr('completed'),
        ]);
        
        return view('backend.plans.edit')->with([
            'plans' => $this->plans,
            'vehicles' => $vehicles,
            'statuses' => $statuses
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Routes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Vehicles\Vehicle;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Routes\Route
     */
    protected $routes;

    /**
     * @param App\Models\Routes\Route $routes
     */
    public function __construct($routes)
    {
        $this->routes = $routes;
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
                });
        return view('backend.routes.edit',compact('vehicles', ))->with([
            'routes' => $this->routes
        ]);
    }
}
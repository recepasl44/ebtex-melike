<?php

namespace App\Http\Responses\Backend\ServiceStops;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Routes\Route;


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
        $routes= collect(Route::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.servicestops.create',compact('routes', ));
    }
}
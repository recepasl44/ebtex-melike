<?php

namespace App\Http\Responses\Backend\Vehicles;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Models\Model;


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
        $models= collect(Model::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.vehicles.create',compact('models', ));
    }
}
<?php

namespace App\Http\Responses\Backend\Counties;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Cities\City;


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
        $cities= collect(City::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.counties.create',compact('cities', ));
    }
}
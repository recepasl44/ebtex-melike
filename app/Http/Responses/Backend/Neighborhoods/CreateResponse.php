<?php

namespace App\Http\Responses\Backend\Neighborhoods;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Districts\District;


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
        $districts= collect(District::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.neighborhoods.create',compact('districts', ));
    }
}
<?php

namespace App\Http\Responses\Backend\ComponentValues;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Components\Component;


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
        $components= collect(Component::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.componentvalues.create',compact('components', ));
    }
}
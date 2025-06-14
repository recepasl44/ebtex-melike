<?php

namespace App\Http\Responses\Backend\Classes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Institutions\Institution;


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
        $institutions= collect(Institution::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.classes.create',compact('institutions', ));
    }
}
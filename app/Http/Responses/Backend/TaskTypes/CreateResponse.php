<?php

namespace App\Http\Responses\Backend\TaskTypes;

use Illuminate\Contracts\Support\Responsable;


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
        
        
        return view('backend.tasktypes.create',);
    }
}
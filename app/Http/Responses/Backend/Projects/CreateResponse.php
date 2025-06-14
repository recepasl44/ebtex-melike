<?php

namespace App\Http\Responses\Backend\Projects;

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
        $status = [
            0 => _tr('labels.backend.projects.table.passive'),
            1 => _tr('labels.backend.projects.table.active')
        ];
        return view('backend.projects.create',compact('status'));
    }
}
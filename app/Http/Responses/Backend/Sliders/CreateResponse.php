<?php

namespace App\Http\Responses\Backend\Sliders;

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
            0 => _tr('labels.general.inactive'),
            1 => _tr('labels.general.active'),
        ];
        return view('backend.sliders.create',[
            'status' => $status
        ]);
    }
}
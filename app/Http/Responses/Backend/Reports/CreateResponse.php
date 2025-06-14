<?php

namespace App\Http\Responses\Backend\Reports;

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
        $statuses = [
            0 => _tr('labels.backend.reports.table.pending'), 
            1 => _tr('labels.backend.reports.table.done'), 
            2 => _tr('labels.backend.reports.table.processing'), 
            3 => _tr('labels.backend.reports.table.dummy'), 
        ];
        return view('backend.reports.create',[
            'statuses' => $statuses,
        ]);
    }
}
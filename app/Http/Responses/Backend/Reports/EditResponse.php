<?php

namespace App\Http\Responses\Backend\Reports;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Reports\Report
     */
    protected $reports;

    /**
     * @param App\Models\Reports\Report $reports
     */
    public function __construct($reports)
    {
        $this->reports = $reports;
    }

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
        return view('backend.reports.edit')->with([
            'reports' => $this->reports,
            'statuses' => $statuses,
        ]);
    }
}
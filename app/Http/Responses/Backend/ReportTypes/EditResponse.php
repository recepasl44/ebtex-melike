<?php

namespace App\Http\Responses\Backend\ReportTypes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\ReportTypes\ReportType;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\ReportTypes\ReportType
     */
    protected $reporttypes;

    /**
     * @param App\Models\ReportTypes\ReportType $reporttypes
     */
    public function __construct($reporttypes)
    {
        $this->reporttypes = $reporttypes;
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
        $parents=collect(ReportType::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.reporttypes.edit')->with([
            'reporttypes' => $this->reporttypes,
            'parents' => $parents
        ]);
    }
}
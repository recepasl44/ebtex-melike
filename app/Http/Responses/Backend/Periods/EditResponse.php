<?php

namespace App\Http\Responses\Backend\Periods;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Periods\Period
     */
    protected $periods;

    /**
     * @param App\Models\Periods\Period $periods
     */
    public function __construct($periods)
    {
        $this->periods = $periods;
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
        
        return view('backend.periods.edit',)->with([
            'periods' => $this->periods
        ]);
    }
}
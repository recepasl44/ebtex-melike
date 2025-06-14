<?php

namespace App\Http\Responses\Backend\Firms;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Firms\Firm
     */
    protected $firms;

    /**
     * @param App\Models\Firms\Firm $firms
     */
    public function __construct($firms)
    {
        $this->firms = $firms;
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
        
        return view('backend.firms.edit')->with([
            'firms' => $this->firms
        ]);
    }
}
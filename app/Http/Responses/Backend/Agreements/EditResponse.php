<?php

namespace App\Http\Responses\Backend\Agreements;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Agreements\Agreement
     */
    protected $agreements;

    /**
     * @param App\Models\Agreements\Agreement $agreements
     */
    public function __construct($agreements)
    {
        $this->agreements = $agreements;
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
        
        return view('backend.agreements.edit',)->with([
            'agreements' => $this->agreements
        ]);
    }
}
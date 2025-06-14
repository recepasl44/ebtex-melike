<?php

namespace App\Http\Responses\Backend\Workshops;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Workshops\Workshop
     */
    protected $workshops;

    /**
     * @param App\Models\Workshops\Workshop $workshops
     */
    public function __construct($workshops)
    {
        $this->workshops = $workshops;
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
        
        return view('backend.workshops.edit')->with([
            'workshops' => $this->workshops
        ]);
    }
}
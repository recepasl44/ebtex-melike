<?php

namespace App\Http\Responses\Backend\Insurers;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Insurers\Insurer
     */
    protected $insurers;

    /**
     * @param App\Models\Insurers\Insurer $insurers
     */
    public function __construct($insurers)
    {
        $this->insurers = $insurers;
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
        
        return view('backend.insurers.edit')->with([
            'insurers' => $this->insurers
        ]);
    }
}
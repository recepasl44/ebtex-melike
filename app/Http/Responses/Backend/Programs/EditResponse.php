<?php

namespace App\Http\Responses\Backend\Programs;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Programs\Program
     */
    protected $programs;

    /**
     * @param App\Models\Programs\Program $programs
     */
    public function __construct($programs)
    {
        $this->programs = $programs;
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
        
        return view('backend.programs.edit',)->with([
            'programs' => $this->programs
        ]);
    }
}
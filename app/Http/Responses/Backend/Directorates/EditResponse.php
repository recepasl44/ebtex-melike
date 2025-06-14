<?php

namespace App\Http\Responses\Backend\Directorates;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Directorates\Directorate
     */
    protected $directorates;

    /**
     * @param App\Models\Directorates\Directorate $directorates
     */
    public function __construct($directorates)
    {
        $this->directorates = $directorates;
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
        
        return view('backend.directorates.edit')->with([
            'directorates' => $this->directorates
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\AcademicTitles;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AcademicTitles\AcademicTitle
     */
    protected $academictitles;

    /**
     * @param App\Models\AcademicTitles\AcademicTitle $academictitles
     */
    public function __construct($academictitles)
    {
        $this->academictitles = $academictitles;
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
        
        return view('backend.academictitles.edit',)->with([
            'academictitles' => $this->academictitles
        ]);
    }
}
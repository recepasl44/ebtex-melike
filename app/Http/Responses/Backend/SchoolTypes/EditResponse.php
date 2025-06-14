<?php

namespace App\Http\Responses\Backend\SchoolTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SchoolTypes\SchoolType
     */
    protected $schooltypes;

    /**
     * @param App\Models\SchoolTypes\SchoolType $schooltypes
     */
    public function __construct($schooltypes)
    {
        $this->schooltypes = $schooltypes;
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
        
        return view('backend.schooltypes.edit',)->with([
            'schooltypes' => $this->schooltypes
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\EducationStatuses;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\EducationStatuses\EducationStatus
     */
    protected $educationstatuses;

    /**
     * @param App\Models\EducationStatuses\EducationStatus $educationstatuses
     */
    public function __construct($educationstatuses)
    {
        $this->educationstatuses = $educationstatuses;
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
        
        return view('backend.educationstatuses.edit',)->with([
            'educationstatuses' => $this->educationstatuses
        ]);
    }
}
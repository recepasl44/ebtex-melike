<?php

namespace App\Http\Responses\Backend\SchoolCategories;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SchoolCategories\SchoolCategory
     */
    protected $schoolcategories;

    /**
     * @param App\Models\SchoolCategories\SchoolCategory $schoolcategories
     */
    public function __construct($schoolcategories)
    {
        $this->schoolcategories = $schoolcategories;
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
        
        return view('backend.schoolcategories.edit',)->with([
            'schoolcategories' => $this->schoolcategories
        ]);
    }
}
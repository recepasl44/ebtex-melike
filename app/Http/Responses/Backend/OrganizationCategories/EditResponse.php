<?php

namespace App\Http\Responses\Backend\OrganizationCategories;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OrganizationCategories\OrganizationCategory
     */
    protected $organizationcategories;

    /**
     * @param App\Models\OrganizationCategories\OrganizationCategory $organizationcategories
     */
    public function __construct($organizationcategories)
    {
        $this->organizationcategories = $organizationcategories;
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
        
        return view('backend.organizationcategories.edit')->with([
            'organizationcategories' => $this->organizationcategories
        ]);
    }
}
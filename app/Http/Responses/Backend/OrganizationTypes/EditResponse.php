<?php

namespace App\Http\Responses\Backend\OrganizationTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OrganizationTypes\OrganizationType
     */
    protected $organizationtypes;

    /**
     * @param App\Models\OrganizationTypes\OrganizationType $organizationtypes
     */
    public function __construct($organizationtypes)
    {
        $this->organizationtypes = $organizationtypes;
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
        
        return view('backend.organizationtypes.edit')->with([
            'organizationtypes' => $this->organizationtypes
        ]);
    }
}
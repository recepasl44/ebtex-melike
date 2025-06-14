<?php

namespace App\Http\Responses\Backend\GroupTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\GroupTypes\GroupType
     */
    protected $grouptypes;

    /**
     * @param App\Models\GroupTypes\GroupType $grouptypes
     */
    public function __construct($grouptypes)
    {
        $this->grouptypes = $grouptypes;
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
        
        return view('backend.grouptypes.edit',)->with([
            'grouptypes' => $this->grouptypes
        ]);
    }
}
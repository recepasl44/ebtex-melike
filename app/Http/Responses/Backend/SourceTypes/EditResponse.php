<?php

namespace App\Http\Responses\Backend\SourceTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SourceTypes\SourceType
     */
    protected $sourcetypes;

    /**
     * @param App\Models\SourceTypes\SourceType $sourcetypes
     */
    public function __construct($sourcetypes)
    {
        $this->sourcetypes = $sourcetypes;
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
        
        return view('backend.sourcetypes.edit',)->with([
            'sourcetypes' => $this->sourcetypes
        ]);
    }
}
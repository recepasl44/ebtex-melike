<?php

namespace App\Http\Responses\Backend\Sources;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Sources\Source
     */
    protected $sources;

    /**
     * @param App\Models\Sources\Source $sources
     */
    public function __construct($sources)
    {
        $this->sources = $sources;
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
        
        return view('backend.sources.edit',)->with([
            'sources' => $this->sources
        ]);
    }
}
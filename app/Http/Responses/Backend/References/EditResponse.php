<?php

namespace App\Http\Responses\Backend\References;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\References\Reference
     */
    protected $references;

    /**
     * @param App\Models\References\Reference $references
     */
    public function __construct($references)
    {
        $this->references = $references;
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
        return view('backend.references.edit')->with([
            'references' => $this->references
        ]);
    }
}
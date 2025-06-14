<?php

namespace App\Http\Responses\Backend\Components;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Components\Component
     */
    protected $components;

    /**
     * @param App\Models\Components\Component $components
     */
    public function __construct($components)
    {
        $this->components = $components;
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
        
        return view('backend.components.edit',)->with([
            'components' => $this->components
        ]);
    }
}
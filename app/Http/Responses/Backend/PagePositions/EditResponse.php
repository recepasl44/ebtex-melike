<?php

namespace App\Http\Responses\Backend\PagePositions;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\PagePositions\PagePosition
     */
    protected $pagepositions;

    /**
     * @param App\Models\PagePositions\PagePosition $pagepositions
     */
    public function __construct($pagepositions)
    {
        $this->pagepositions = $pagepositions;
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
        
        return view('backend.pagepositions.edit',)->with([
            'pagepositions' => $this->pagepositions
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\PageTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\PageTypes\PageType
     */
    protected $pagetypes;

    /**
     * @param App\Models\PageTypes\PageType $pagetypes
     */
    public function __construct($pagetypes)
    {
        $this->pagetypes = $pagetypes;
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
        
        return view('backend.pagetypes.edit',)->with([
            'pagetypes' => $this->pagetypes
        ]);
    }
}
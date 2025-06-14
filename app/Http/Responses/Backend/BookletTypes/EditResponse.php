<?php

namespace App\Http\Responses\Backend\BookletTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\BookletTypes\BookletType
     */
    protected $booklettypes;

    /**
     * @param App\Models\BookletTypes\BookletType $booklettypes
     */
    public function __construct($booklettypes)
    {
        $this->booklettypes = $booklettypes;
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
        
        return view('backend.booklettypes.edit',)->with([
            'booklettypes' => $this->booklettypes
        ]);
    }
}
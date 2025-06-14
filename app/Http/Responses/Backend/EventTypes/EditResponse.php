<?php

namespace App\Http\Responses\Backend\EventTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\EventTypes\EventType
     */
    protected $eventtypes;

    /**
     * @param App\Models\EventTypes\EventType $eventtypes
     */
    public function __construct($eventtypes)
    {
        $this->eventtypes = $eventtypes;
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
        
        return view('backend.eventtypes.edit',)->with([
            'eventtypes' => $this->eventtypes
        ]);
    }
}
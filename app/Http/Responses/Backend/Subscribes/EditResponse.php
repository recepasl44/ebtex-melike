<?php

namespace App\Http\Responses\Backend\Subscribes;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Subscribes\Subscribe
     */
    protected $subscribes;

    /**
     * @param App\Models\Subscribes\Subscribe $subscribes
     */
    public function __construct($subscribes)
    {
        $this->subscribes = $subscribes;
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
        return view('backend.subscribes.edit')->with([
            'subscribes' => $this->subscribes
        ]);
    }
}
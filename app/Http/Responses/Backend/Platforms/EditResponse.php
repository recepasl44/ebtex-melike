<?php

namespace App\Http\Responses\Backend\Platforms;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Platforms\Platform
     */
    protected $platforms;

    /**
     * @param App\Models\Platforms\Platform $platforms
     */
    public function __construct($platforms)
    {
        $this->platforms = $platforms;
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
        
        return view('backend.platforms.edit',)->with([
            'platforms' => $this->platforms
        ]);
    }
}
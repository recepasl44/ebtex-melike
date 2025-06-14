<?php

namespace App\Http\Responses\Backend\Areas;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Areas\Area
     */
    protected $areas;

    /**
     * @param App\Models\Areas\Area $areas
     */
    public function __construct($areas)
    {
        $this->areas = $areas;
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
        
        return view('backend.areas.edit',)->with([
            'areas' => $this->areas
        ]);
    }
}
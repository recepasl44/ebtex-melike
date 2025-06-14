<?php

namespace App\Http\Responses\Backend\UsedAreas;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\UsedAreas\UsedArea
     */
    protected $usedareas;

    /**
     * @param App\Models\UsedAreas\UsedArea $usedareas
     */
    public function __construct($usedareas)
    {
        $this->usedareas = $usedareas;
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
        
        return view('backend.usedareas.edit',)->with([
            'usedareas' => $this->usedareas
        ]);
    }
}
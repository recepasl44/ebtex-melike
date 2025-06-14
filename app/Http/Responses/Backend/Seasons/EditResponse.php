<?php

namespace App\Http\Responses\Backend\Seasons;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Seasons\Season
     */
    protected $seasons;

    /**
     * @param App\Models\Seasons\Season $seasons
     */
    public function __construct($seasons)
    {
        $this->seasons = $seasons;
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
        
        return view('backend.seasons.edit',)->with([
            'seasons' => $this->seasons
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Socials;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Socials\Social
     */
    protected $socials;

    /**
     * @param App\Models\Socials\Social $socials
     */
    public function __construct($socials)
    {
        $this->socials = $socials;
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
        return view('backend.socials.edit')->with([
            'social' => $this->socials
        ]);
    }
}
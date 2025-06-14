<?php

namespace App\Http\Responses\Backend\Colors;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Colors\Color
     */
    protected $colors;

    /**
     * @param App\Models\Colors\Color $colors
     */
    public function __construct($colors)
    {
        $this->colors = $colors;
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
        
        return view('backend.colors.edit')->with([
            'colors' => $this->colors
        ]);
    }
}
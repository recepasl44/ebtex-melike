<?php

namespace App\Http\Responses\Backend\Sliders;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Sliders\Slider
     */
    protected $sliders;

    /**
     * @param App\Models\Sliders\Slider $sliders
     */
    public function __construct($sliders)
    {
        $this->sliders = $sliders;
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
        $status = [
            0 => _tr('labels.general.inactive'),
            1 => _tr('labels.general.active'),
        ];
        return view('backend.sliders.edit')->with([
            'slider' => $this->sliders,
            'status' => $status
        ]);
    }
}
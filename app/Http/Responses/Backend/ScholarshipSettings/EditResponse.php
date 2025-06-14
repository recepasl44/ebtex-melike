<?php

namespace App\Http\Responses\Backend\ScholarshipSettings;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ScholarshipSettings\ScholarshipSetting
     */
    protected $scholarshipsettings;

    /**
     * @param App\Models\ScholarshipSettings\ScholarshipSetting $scholarshipsettings
     */
    public function __construct($scholarshipsettings)
    {
        $this->scholarshipsettings = $scholarshipsettings;
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
        
        return view('backend.scholarshipsettings.edit',)->with([
            'scholarshipsettings' => $this->scholarshipsettings
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Professions;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Professions\Profession
     */
    protected $professions;

    /**
     * @param App\Models\Professions\Profession $professions
     */
    public function __construct($professions)
    {
        $this->professions = $professions;
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
        
        return view('backend.professions.edit',)->with([
            'professions' => $this->professions
        ]);
    }
}
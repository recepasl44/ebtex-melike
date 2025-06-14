<?php

namespace App\Http\Responses\Backend\Faculties;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Universities\University;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Faculties\Faculty
     */
    protected $faculties;

    /**
     * @param App\Models\Faculties\Faculty $faculties
     */
    public function __construct($faculties)
    {
        $this->faculties = $faculties;
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
        $universities=collect(University::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.faculties.edit')->with([
            'faculties' => $this->faculties,
            'universities' => $universities
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Universities;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Cities\City;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Universities\University
     */
    protected $universities;

    /**
     * @param App\Models\Universities\University $universities
     */
    public function __construct($universities)
    {
        $this->universities = $universities;
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
        $cities=collect(City::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.universities.edit')->with([
            'universities' => $this->universities,
            'cities' => $cities
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Schools;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Countries\Country;
use App\Models\Cities\City;
use App\Models\Counties\County;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Schools\School
     */
    protected $schools;

    /**
     * @param App\Models\Schools\School $schools
     */
    public function __construct($schools)
    {
        $this->schools = $schools;
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
        $countries= collect(Country::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$cities= collect(City::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$counties= collect(County::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.schools.edit',compact('countries', 'cities', 'counties', ))->with([
            'schools' => $this->schools
        ]);
    }
}
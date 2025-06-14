<?php

namespace App\Http\Responses\Backend\Schools;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Countries\Country;
use App\Models\Cities\City;
use App\Models\Counties\County;


class CreateResponse implements Responsable
{
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
        
        return view('backend.schools.create',compact('countries', 'cities', 'counties', ));
    }
}
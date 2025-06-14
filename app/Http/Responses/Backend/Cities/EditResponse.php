<?php

namespace App\Http\Responses\Backend\Cities;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Countries\Country;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Cities\City
     */
    protected $cities;

    /**
     * @param App\Models\Cities\City $cities
     */
    public function __construct($cities)
    {
        $this->cities = $cities;
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
        $countries=collect(Country::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.cities.edit')->with([
            'cities' => $this->cities,
            'countries' => $countries
        ]);
    }
}
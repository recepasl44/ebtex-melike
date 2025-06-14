<?php

namespace App\Http\Responses\Backend\Addresses;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Countries\Country;
use App\Models\Cities\City;
use App\Models\Counties\County;
use App\Models\Districts\District;
use App\Models\Neighborhoods\Neighborhood;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Addresses\Address
     */
    protected $addresses;

    /**
     * @param App\Models\Addresses\Address $addresses
     */
    public function __construct($addresses)
    {
        $this->addresses = $addresses;
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
                });$districts= collect(District::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$neighborhoods= collect(Neighborhood::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.addresses.edit',compact('countries', 'cities', 'counties', 'districts', 'neighborhoods', ))->with([
            'addresses' => $this->addresses
        ]);
    }
}
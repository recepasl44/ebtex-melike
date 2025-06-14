<?php

namespace App\Http\Responses\Backend\Counties;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Cities\City;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Counties\County
     */
    protected $counties;

    /**
     * @param App\Models\Counties\County $counties
     */
    public function __construct($counties)
    {
        $this->counties = $counties;
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
        $cities= collect(City::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.counties.edit',compact('cities', ))->with([
            'counties' => $this->counties
        ]);
    }
}
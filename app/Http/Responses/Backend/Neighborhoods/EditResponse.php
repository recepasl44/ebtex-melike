<?php

namespace App\Http\Responses\Backend\Neighborhoods;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Districts\District;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Neighborhoods\Neighborhood
     */
    protected $neighborhoods;

    /**
     * @param App\Models\Neighborhoods\Neighborhood $neighborhoods
     */
    public function __construct($neighborhoods)
    {
        $this->neighborhoods = $neighborhoods;
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
        $districts= collect(District::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.neighborhoods.edit',compact('districts', ))->with([
            'neighborhoods' => $this->neighborhoods
        ]);
    }
}
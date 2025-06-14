<?php

namespace App\Http\Responses\Backend\Districts;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Counties\County;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Districts\District
     */
    protected $districts;

    /**
     * @param App\Models\Districts\District $districts
     */
    public function __construct($districts)
    {
        $this->districts = $districts;
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
        $counties= collect(County::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.districts.edit',compact('counties', ))->with([
            'districts' => $this->districts
        ]);
    }
}
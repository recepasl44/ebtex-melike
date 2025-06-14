<?php

namespace App\Http\Responses\Backend\Chapters;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Units\Unit;


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
        $units= collect(Unit::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.chapters.create',compact('units', ));
    }
}
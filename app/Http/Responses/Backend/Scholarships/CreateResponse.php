<?php

namespace App\Http\Responses\Backend\Scholarships;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;


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
        $branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.scholarships.create',compact('branches', 'seasons', ));
    }
}
<?php

namespace App\Http\Responses\Backend\Institutions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\InstitutionTypes\InstitutionType;


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
        $institutiontypes= collect(InstitutionType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.institutions.create',compact('institutiontypes', ));
    }
}
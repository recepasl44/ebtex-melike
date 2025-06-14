<?php

namespace App\Http\Responses\Backend\Discounts;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Services\Service;


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
        $services= collect(Service::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.discounts.create',compact('services', ));
    }
}
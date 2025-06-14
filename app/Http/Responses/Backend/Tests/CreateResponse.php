<?php

namespace App\Http\Responses\Backend\Tests;

use Illuminate\Contracts\Support\Responsable;
use App\Models\TestTypes\TestType;


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
        $testtypes= collect(TestType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.tests.create',compact('testtypes', ));
    }
}
<?php

namespace App\Http\Responses\Backend\Booklets;

use Illuminate\Contracts\Support\Responsable;
use App\Models\BookletTypes\BookletType;


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
        $booklettypes= collect(BookletType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.booklets.create',compact('booklettypes', ));
    }
}
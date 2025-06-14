<?php

namespace App\Http\Responses\Backend\Topics;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Chapters\Chapter;


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
        $chapters= collect(Chapter::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.topics.create',compact('chapters', ));
    }
}
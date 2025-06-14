<?php

namespace App\Http\Responses\Backend\Achievements;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Topics\Topic;


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
        $topics= collect(Topic::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.achievements.create',compact('topics', ));
    }
}
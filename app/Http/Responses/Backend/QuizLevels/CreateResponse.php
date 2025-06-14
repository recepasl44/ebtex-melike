<?php

namespace App\Http\Responses\Backend\QuizLevels;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Levels\Level;
use App\Models\Scholarships\Scholarship;


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
        $levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.quizlevels.create',compact('levels', 'scholarships', ));
    }
}
<?php

namespace App\Http\Responses\Backend\PointTypes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizCategories\QuizCategory;


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
        $quizcategories= collect(QuizCategory::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.pointtypes.create',compact('quizcategories', ));
    }
}
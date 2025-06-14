<?php

namespace App\Http\Responses\Backend\TestQuestions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tests\Test;
use App\Models\Questions\Question;


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
        $tests= collect(Test::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$questions= collect(Question::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.testquestions.create',compact('tests', 'questions', ));
    }
}
<?php

namespace App\Http\Responses\Backend\CorrectAnswers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Questions\Question;
use App\Models\Quizzes\Quiz;


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
        $questions= collect(Question::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizzes= collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.correctanswers.create',compact('questions', 'quizzes', ));
    }
}
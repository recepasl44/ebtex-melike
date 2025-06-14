<?php

namespace App\Http\Responses\Backend\QuizQuestion;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Questions\Question;

class CreateResponse implements Responsable
{
    protected $quiz;

    public function __construct($quiz)
    {
        $this->quiz = $quiz;
    }
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $quizzes=collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        return view('backend.quizquestions.create',[
            'quiz'=>$this->quiz,
            'quizzes'=>$quizzes
        ]);
    }
}
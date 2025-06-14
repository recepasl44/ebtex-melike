<?php

namespace App\Http\Responses\Backend\QuizQuestions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Questions\Question;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizQuestions\QuizQuestion
     */
    protected $quizquestions;

    /**
     * @param App\Models\QuizQuestions\QuizQuestion $quizquestions
     */
    public function __construct($quizquestions)
    {
        $this->quizquestions = $quizquestions;
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
        $quizzes= collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$questions= collect(Question::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizquestions.edit',compact('quizzes', 'questions', ))->with([
            'quizquestions' => $this->quizquestions
        ]);
    }
}
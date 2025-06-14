<?php

namespace App\Http\Responses\Backend\Answers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Questions\Question;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Answers\Answer
     */
    protected $answers;

    /**
     * @param App\Models\Answers\Answer $answers
     */
    public function __construct($answers)
    {
        $this->answers = $answers;
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
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.answers.edit',compact('quizzes', 'questions', 'users', ))->with([
            'answers' => $this->answers
        ]);
    }
}
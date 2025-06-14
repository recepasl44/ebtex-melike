<?php

namespace App\Http\Responses\Backend\QuizApplications;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizApplications\QuizApplication
     */
    protected $quizapplications;

    /**
     * @param App\Models\QuizApplications\QuizApplication $quizapplications
     */
    public function __construct($quizapplications)
    {
        $this->quizapplications = $quizapplications;
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
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizapplications.edit',compact('quizzes', 'users', ))->with([
            'quizapplications' => $this->quizapplications
        ]);
    }
}
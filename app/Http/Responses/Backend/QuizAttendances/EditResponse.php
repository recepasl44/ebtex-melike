<?php

namespace App\Http\Responses\Backend\QuizAttendances;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizAttendances\QuizAttendance
     */
    protected $quizattendances;

    /**
     * @param App\Models\QuizAttendances\QuizAttendance $quizattendances
     */
    public function __construct($quizattendances)
    {
        $this->quizattendances = $quizattendances;
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
        return view('backend.quizattendances.edit',compact('quizzes', 'users', ))->with([
            'quizattendances' => $this->quizattendances
        ]);
    }
}
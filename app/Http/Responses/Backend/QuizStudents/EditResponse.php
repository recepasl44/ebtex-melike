<?php

namespace App\Http\Responses\Backend\QuizStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizStudents\QuizStudent
     */
    protected $quizstudents;

    /**
     * @param App\Models\QuizStudents\QuizStudent $quizstudents
     */
    public function __construct($quizstudents)
    {
        $this->quizstudents = $quizstudents;
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
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizstudents.edit',compact('quizzes', 'students', ))->with([
            'quizstudents' => $this->quizstudents
        ]);
    }
}
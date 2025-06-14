<?php

namespace App\Http\Responses\Backend\QuizClassrooms;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Scholarships\Scholarship;
use App\Models\Classrooms\Classroom;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizClassrooms\QuizClassroom
     */
    protected $quizclassrooms;

    /**
     * @param App\Models\QuizClassrooms\QuizClassroom $quizclassrooms
     */
    public function __construct($quizclassrooms)
    {
        $this->quizclassrooms = $quizclassrooms;
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
        $scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$classrooms= collect(Classroom::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizclassrooms.edit',compact('scholarships', 'classrooms', ))->with([
            'quizclassrooms' => $this->quizclassrooms
        ]);
    }
}
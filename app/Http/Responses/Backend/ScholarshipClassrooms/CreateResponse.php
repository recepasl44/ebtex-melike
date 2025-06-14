<?php

namespace App\Http\Responses\Backend\QuizClassrooms;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Scholarships\Scholarship;
use App\Models\Classrooms\Classroom;


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
        $scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$classrooms= collect(Classroom::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.quizclassrooms.create',compact('scholarships', 'classrooms', ));
    }
}
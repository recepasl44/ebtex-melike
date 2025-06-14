<?php

namespace App\Http\Responses\Backend\GuidanceObservations;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Lessons\Lesson;


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
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$lessons= collect(Lesson::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.guidanceobservations.create',compact('students', 'lessons', ));
    }
}
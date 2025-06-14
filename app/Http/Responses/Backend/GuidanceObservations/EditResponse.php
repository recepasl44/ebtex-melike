<?php

namespace App\Http\Responses\Backend\GuidanceObservations;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Lessons\Lesson;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\GuidanceObservations\GuidanceObservation
     */
    protected $guidanceobservations;

    /**
     * @param App\Models\GuidanceObservations\GuidanceObservation $guidanceobservations
     */
    public function __construct($guidanceobservations)
    {
        $this->guidanceobservations = $guidanceobservations;
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
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$lessons= collect(Lesson::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.guidanceobservations.edit',compact('students', 'lessons', ))->with([
            'guidanceobservations' => $this->guidanceobservations
        ]);
    }
}
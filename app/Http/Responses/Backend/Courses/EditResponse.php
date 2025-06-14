<?php

namespace App\Http\Responses\Backend\Courses;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Levels\Level;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Courses\Course
     */
    protected $courses;

    /**
     * @param App\Models\Courses\Course $courses
     */
    public function __construct($courses)
    {
        $this->courses = $courses;
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
        $levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.courses.edit',compact('levels', ))->with([
            'courses' => $this->courses
        ]);
    }
}
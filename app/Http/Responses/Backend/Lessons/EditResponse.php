<?php

namespace App\Http\Responses\Backend\Lessons;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Lessons\Lesson
     */
    protected $lessons;

    /**
     * @param App\Models\Lessons\Lesson $lessons
     */
    public function __construct($lessons)
    {
        $this->lessons = $lessons;
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
        
        return view('backend.lessons.edit',)->with([
            'lessons' => $this->lessons
        ]);
    }
}
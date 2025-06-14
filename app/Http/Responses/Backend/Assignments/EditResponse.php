<?php

namespace App\Http\Responses\Backend\Assignments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Teachers\Teacher;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Schooltypes\Schooltype;
use App\Models\Courses\Course;
use App\Models\Sources\Source;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Assignments\Assignment
     */
    protected $assignments;

    /**
     * @param App\Models\Assignments\Assignment $assignments
     */
    public function __construct($assignments)
    {
        $this->assignments = $assignments;
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
        $teachers= collect(Teacher::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$schooltypes= collect(Schooltype::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$courses= collect(Course::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$sources= collect(Source::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.assignments.edit',compact('teachers', 'programs', 'levels', 'schooltypes', 'courses', 'sources', ))->with([
            'assignments' => $this->assignments
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\AssignmentStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Assigments\Assigment;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AssignmentStudents\AssignmentStudent
     */
    protected $assignmentstudents;

    /**
     * @param App\Models\AssignmentStudents\AssignmentStudent $assignmentstudents
     */
    public function __construct($assignmentstudents)
    {
        $this->assignmentstudents = $assignmentstudents;
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
        $assigments= collect(Assigment::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.assignmentstudents.edit',compact('assigments', 'students', ))->with([
            'assignmentstudents' => $this->assignmentstudents
        ]);
    }
}
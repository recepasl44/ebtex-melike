<?php

namespace App\Http\Responses\Backend\StudentPsychologicals;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\StudentPsychologicals\StudentPsychological
     */
    protected $studentpsychologicals;

    /**
     * @param App\Models\StudentPsychologicals\StudentPsychological $studentpsychologicals
     */
    public function __construct($studentpsychologicals)
    {
        $this->studentpsychologicals = $studentpsychologicals;
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
                });
        return view('backend.studentpsychologicals.edit',compact('students', ))->with([
            'studentpsychologicals' => $this->studentpsychologicals
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\StudentInfos;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\StudentInfos\StudentInfo
     */
    protected $studentinfos;

    /**
     * @param App\Models\StudentInfos\StudentInfo $studentinfos
     */
    public function __construct($studentinfos)
    {
        $this->studentinfos = $studentinfos;
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
        return view('backend.studentinfos.edit',compact('students', ))->with([
            'studentinfos' => $this->studentinfos
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Enrollments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Services\Service;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Enrollments\Enrollment
     */
    protected $enrollments;

    /**
     * @param App\Models\Enrollments\Enrollment $enrollments
     */
    public function __construct($enrollments)
    {
        $this->enrollments = $enrollments;
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
                });$services= collect(Service::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.enrollments.edit',compact('students', 'services', ))->with([
            'enrollments' => $this->enrollments
        ]);
    }
}
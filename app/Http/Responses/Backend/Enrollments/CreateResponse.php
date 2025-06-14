<?php

namespace App\Http\Responses\Backend\Enrollments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Services\Service;


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
                });$services= collect(Service::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.enrollments.create',compact('students', 'services', ));
    }
}
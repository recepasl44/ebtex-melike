<?php

namespace App\Http\Responses\Backend\ServiceStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Services\Service;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ServiceStudents\ServiceStudent
     */
    protected $servicestudents;

    /**
     * @param App\Models\ServiceStudents\ServiceStudent $servicestudents
     */
    public function __construct($servicestudents)
    {
        $this->servicestudents = $servicestudents;
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
        $services= collect(Service::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.servicestudents.edit',compact('services', 'students', ))->with([
            'servicestudents' => $this->servicestudents
        ]);
    }
}
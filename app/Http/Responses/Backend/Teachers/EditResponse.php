<?php

namespace App\Http\Responses\Backend\Teachers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Departments\Department;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Teachers\Teacher
     */
    protected $teachers;

    /**
     * @param App\Models\Teachers\Teacher $teachers
     */
    public function __construct($teachers)
    {
        $this->teachers = $teachers;
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
        $departments=collect(Department::where('status',1)->get())->mapWithKeys(function ($item) {
            return [$item['id'] => $item->faculty->university->short_name.' - '.$item['name']];
        });
        return view('backend.teachers.edit')->with([
            'teachers' => $this->teachers,
            'departments' => $departments
        ]);
    }
}
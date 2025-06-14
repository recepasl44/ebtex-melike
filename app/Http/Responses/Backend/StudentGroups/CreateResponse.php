<?php

namespace App\Http\Responses\Backend\StudentGroups;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Groups\Group;


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
                });$groups= collect(Group::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.studentgroups.create',compact('students', 'groups', ));
    }
}
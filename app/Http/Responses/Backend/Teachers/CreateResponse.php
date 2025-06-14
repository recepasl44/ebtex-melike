<?php

namespace App\Http\Responses\Backend\Teachers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Departments\Department;

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
        $departments=collect(Department::where('status',1)->get())->mapWithKeys(function ($item) {
            return [$item['id'] => $item->faculty->university->short_name.' - '.$item['name']];
        });
        return view('backend.teachers.create',['departments'=>$departments]);
    }
}
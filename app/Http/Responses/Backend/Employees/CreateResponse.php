<?php

namespace App\Http\Responses\Backend\Employees;

use Illuminate\Contracts\Support\Responsable;
use App\Models\EmployeeTypes\EmployeeType;


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
        $employeetypes= collect(EmployeeType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.employees.create',compact('employeetypes', ));
    }
}
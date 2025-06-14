<?php

namespace App\Http\Responses\Backend\Employees;

use Illuminate\Contracts\Support\Responsable;
use App\Models\EmployeeTypes\EmployeeType;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Employees\Employee
     */
    protected $employees;

    /**
     * @param App\Models\Employees\Employee $employees
     */
    public function __construct($employees)
    {
        $this->employees = $employees;
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
        $employeetypes= collect(EmployeeType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.employees.edit',compact('employeetypes', ))->with([
            'employees' => $this->employees
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\ContractEmployees;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Employees\Employee;
use App\Models\ContractTypes\ContractType;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ContractEmployees\ContractEmployee
     */
    protected $contractemployees;

    /**
     * @param App\Models\ContractEmployees\ContractEmployee $contractemployees
     */
    public function __construct($contractemployees)
    {
        $this->contractemployees = $contractemployees;
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
        $employees= collect(Employee::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$contracttypes= collect(ContractType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.contractemployees.edit',compact('employees', 'contracttypes', ))->with([
            'contractemployees' => $this->contractemployees
        ]);
    }
}
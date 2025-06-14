<?php

namespace App\Http\Responses\Backend\Departments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Faculties\Faculty;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Departments\Department
     */
    protected $departments;

    /**
     * @param App\Models\Departments\Department $departments
     */
    public function __construct($departments)
    {
        $this->departments = $departments;
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
        $faculties=collect(Faculty::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $status = [
            0 => _tr('labels.backend.departments.table.passive'),
            1 => _tr('labels.backend.departments.table.active')
        ];
        return view('backend.departments.edit')->with([
            'departments' => $this->departments,
            'faculties' => $faculties,
            'status' => $status
        ]);
    }
}
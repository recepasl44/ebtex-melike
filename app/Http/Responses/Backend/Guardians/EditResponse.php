<?php

namespace App\Http\Responses\Backend\Guardians;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Guardians\Guardian
     */
    protected $guardians;

    /**
     * @param App\Models\Guardians\Guardian $guardians
     */
    public function __construct($guardians)
    {
        $this->guardians = $guardians;
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
                });
        return view('backend.guardians.edit',compact('students', ))->with([
            'guardians' => $this->guardians
        ]);
    }
}
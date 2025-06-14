<?php

namespace App\Http\Responses\Backend\GuidanceMeetings;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\GuidanceMeetings\GuidanceMeeting
     */
    protected $guidancemeetings;

    /**
     * @param App\Models\GuidanceMeetings\GuidanceMeeting $guidancemeetings
     */
    public function __construct($guidancemeetings)
    {
        $this->guidancemeetings = $guidancemeetings;
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
        return view('backend.guidancemeetings.edit',compact('students', ))->with([
            'guidancemeetings' => $this->guidancemeetings
        ]);
    }
}
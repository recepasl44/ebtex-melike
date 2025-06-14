<?php

namespace App\Http\Responses\Backend\GuardianMeetings;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Guardians\Guardian;
use App\Models\Teachers\Teacher;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\GuardianMeetings\GuardianMeeting
     */
    protected $guardianmeetings;

    /**
     * @param App\Models\GuardianMeetings\GuardianMeeting $guardianmeetings
     */
    public function __construct($guardianmeetings)
    {
        $this->guardianmeetings = $guardianmeetings;
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
                });$guardians= collect(Guardian::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$teachers= collect(Teacher::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.guardianmeetings.edit',compact('students', 'guardians', 'teachers', ))->with([
            'guardianmeetings' => $this->guardianmeetings
        ]);
    }
}
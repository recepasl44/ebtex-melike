<?php

namespace App\Http\Responses\Backend\AttendanceTeachers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Attendances\Attendance;
use App\Models\Teachers\Teacher;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AttendanceTeachers\AttendanceTeacher
     */
    protected $attendanceteachers;

    /**
     * @param App\Models\AttendanceTeachers\AttendanceTeacher $attendanceteachers
     */
    public function __construct($attendanceteachers)
    {
        $this->attendanceteachers = $attendanceteachers;
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
        $attendances= collect(Attendance::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$teachers= collect(Teacher::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.attendanceteachers.edit',compact('attendances', 'teachers', ))->with([
            'attendanceteachers' => $this->attendanceteachers
        ]);
    }
}
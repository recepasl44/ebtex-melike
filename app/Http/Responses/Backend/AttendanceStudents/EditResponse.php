<?php

namespace App\Http\Responses\Backend\AttendanceStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Attendances\Attendance;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AttendanceStudents\AttendanceStudent
     */
    protected $attendancestudents;

    /**
     * @param App\Models\AttendanceStudents\AttendanceStudent $attendancestudents
     */
    public function __construct($attendancestudents)
    {
        $this->attendancestudents = $attendancestudents;
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
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.attendancestudents.edit',compact('attendances', 'students', ))->with([
            'attendancestudents' => $this->attendancestudents
        ]);
    }
}
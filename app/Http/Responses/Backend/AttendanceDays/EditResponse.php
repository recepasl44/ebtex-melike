<?php

namespace App\Http\Responses\Backend\AttendanceDays;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Attendances\Attendance;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AttendanceDays\AttendanceDay
     */
    protected $attendancedays;

    /**
     * @param App\Models\AttendanceDays\AttendanceDay $attendancedays
     */
    public function __construct($attendancedays)
    {
        $this->attendancedays = $attendancedays;
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
                });
        return view('backend.attendancedays.edit',compact('attendances', ))->with([
            'attendancedays' => $this->attendancedays
        ]);
    }
}
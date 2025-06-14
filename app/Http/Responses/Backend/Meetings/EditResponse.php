<?php

namespace App\Http\Responses\Backend\Meetings;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Seasons\Season;
use App\Models\Branches\Branche;
use App\Models\Students\Student;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Meetings\Meeting
     */
    protected $meetings;

    /**
     * @param App\Models\Meetings\Meeting $meetings
     */
    public function __construct($meetings)
    {
        $this->meetings = $meetings;
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
        $seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['first_name'].' '.$item['last_name']];
                });
                $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['first_name'].' '.$item['last_name']];
                });
                $student = $this->meetings->student;
        return view('backend.meetings.edit',compact('seasons', 'branches', 'students', 'users', ))->with([
            'meetings' => $this->meetings
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\EventStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Events\Event;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\EventStudents\EventStudent
     */
    protected $eventstudents;

    /**
     * @param App\Models\EventStudents\EventStudent $eventstudents
     */
    public function __construct($eventstudents)
    {
        $this->eventstudents = $eventstudents;
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
        $events= collect(Event::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.eventstudents.edit',compact('events', 'students', ))->with([
            'eventstudents' => $this->eventstudents
        ]);
    }
}
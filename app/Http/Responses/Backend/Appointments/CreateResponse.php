<?php

namespace App\Http\Responses\Backend\Appointments;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Seasons\Season;
use App\Models\Branches\Branche;
use App\Models\Students\Student;


class CreateResponse implements Responsable
{
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
        
        return view('backend.appointments.create',compact('seasons', 'branches', 'students', ));
    }
}
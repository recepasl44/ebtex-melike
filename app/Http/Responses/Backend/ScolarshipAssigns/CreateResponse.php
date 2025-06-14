<?php

namespace App\Http\Responses\Backend\ScolarshipAssigns;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Scholarships\Scholarship;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;
use App\Models\Classrooms\Classroom;
use App\Models\QuizSessions\QuizSession;
use App\Models\Levels\Level;


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
        $scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$classrooms= collect(Classroom::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizsessions= collect(QuizSession::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.scolarshipassigns.create',compact('scholarships', 'branches', 'seasons', 'classrooms', 'quizsessions', 'levels', ));
    }
}
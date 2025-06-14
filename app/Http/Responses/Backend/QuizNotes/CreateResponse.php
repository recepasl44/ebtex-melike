<?php

namespace App\Http\Responses\Backend\QuizNotes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Programs\Program;
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
        $programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.quiznotes.create',compact('programs', 'levels', ));
    }
}
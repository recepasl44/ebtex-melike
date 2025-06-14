<?php

namespace App\Http\Responses\Backend\QuizTimes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizSessions\QuizSession;


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
        $quizsessions= collect(QuizSession::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.quiztimes.create',compact('quizsessions', ));
    }
}
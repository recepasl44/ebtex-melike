<?php

namespace App\Http\Responses\Backend\QuizTimes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizSessions\QuizSession;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizTimes\QuizTime
     */
    protected $quiztimes;

    /**
     * @param App\Models\QuizTimes\QuizTime $quiztimes
     */
    public function __construct($quiztimes)
    {
        $this->quiztimes = $quiztimes;
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
        $quizsessions= collect(QuizSession::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quiztimes.edit',compact('quizsessions', ))->with([
            'quiztimes' => $this->quiztimes
        ]);
    }
}
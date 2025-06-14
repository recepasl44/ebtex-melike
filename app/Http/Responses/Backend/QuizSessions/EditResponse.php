<?php

namespace App\Http\Responses\Backend\QuizSessions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Scholarships\Scholarship;
use App\Models\Branches\Branche;
use App\Models\Programs\Program;
use App\Models\Levels\Level;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizSessions\QuizSession
     */
    protected $quizsessions;

    /**
     * @param App\Models\QuizSessions\QuizSession $quizsessions
     */
    public function __construct($quizsessions)
    {
        $this->quizsessions = $quizsessions;
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
        $scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizsessions.edit',compact('scholarships', 'branches', 'programs', 'levels', ))->with([
            'quizsessions' => $this->quizsessions
        ]);
    }
}
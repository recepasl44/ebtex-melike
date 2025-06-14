<?php

namespace App\Http\Responses\Backend\ExamRelevances;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ExamRelevances\ExamRelevance
     */
    protected $examrelevances;

    /**
     * @param App\Models\ExamRelevances\ExamRelevance $examrelevances
     */
    public function __construct($examrelevances)
    {
        $this->examrelevances = $examrelevances;
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
        
        return view('backend.examrelevances.edit',)->with([
            'examrelevances' => $this->examrelevances
        ]);
    }
}
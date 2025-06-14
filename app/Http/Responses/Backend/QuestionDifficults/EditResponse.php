<?php

namespace App\Http\Responses\Backend\QuestionDifficults;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuestionDifficults\QuestionDifficult
     */
    protected $questiondifficults;

    /**
     * @param App\Models\QuestionDifficults\QuestionDifficult $questiondifficults
     */
    public function __construct($questiondifficults)
    {
        $this->questiondifficults = $questiondifficults;
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
        
        return view('backend.questiondifficults.edit',)->with([
            'questiondifficults' => $this->questiondifficults
        ]);
    }
}
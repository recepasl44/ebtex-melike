<?php

namespace App\Http\Responses\Backend\QuizTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizTypes\QuizType
     */
    protected $quiztypes;

    /**
     * @param App\Models\QuizTypes\QuizType $quiztypes
     */
    public function __construct($quiztypes)
    {
        $this->quiztypes = $quiztypes;
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
        
        return view('backend.quiztypes.edit',)->with([
            'quiztypes' => $this->quiztypes
        ]);
    }
}
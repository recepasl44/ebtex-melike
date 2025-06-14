<?php

namespace App\Http\Responses\Backend\QuizNotes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Programs\Program;
use App\Models\Levels\Level;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizNotes\QuizNote
     */
    protected $quiznotes;

    /**
     * @param App\Models\QuizNotes\QuizNote $quiznotes
     */
    public function __construct($quiznotes)
    {
        $this->quiznotes = $quiznotes;
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
        $programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quiznotes.edit',compact('programs', 'levels', ))->with([
            'quiznotes' => $this->quiznotes
        ]);
    }
}
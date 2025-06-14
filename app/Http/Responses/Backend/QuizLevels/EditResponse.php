<?php

namespace App\Http\Responses\Backend\QuizLevels;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Levels\Level;
use App\Models\Scholarships\Scholarship;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizLevels\QuizLevel
     */
    protected $quizlevels;

    /**
     * @param App\Models\QuizLevels\QuizLevel $quizlevels
     */
    public function __construct($quizlevels)
    {
        $this->quizlevels = $quizlevels;
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
        $levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$scholarships= collect(Scholarship::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizlevels.edit',compact('levels', 'scholarships', ))->with([
            'quizlevels' => $this->quizlevels
        ]);
    }
}
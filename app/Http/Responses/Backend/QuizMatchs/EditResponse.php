<?php

namespace App\Http\Responses\Backend\QuizMatchs;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizTypes\QuizType;
use App\Models\Quizzes\Quiz;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;
use App\Models\Classrooms\Classroom;
use App\Models\Sessions\Session;
use App\Models\Programs\Program;
use App\Models\Levels\Level;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizMatchs\QuizMatch
     */
    protected $quizmatches;

    /**
     * @param App\Models\QuizMatchs\QuizMatch $quizmatches
     */
    public function __construct($quizmatches)
    {
        $this->quizmatches = $quizmatches;
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
        $quiztypes= collect(QuizType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizzes= collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$classrooms= collect(Classroom::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$sessions= collect(Session::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizmatches.edit',compact('quiztypes', 'quizzes', 'branches', 'seasons', 'classrooms', 'sessions', 'programs', 'levels', ))->with([
            'quizmatches' => $this->quizmatches
        ]);
    }
}
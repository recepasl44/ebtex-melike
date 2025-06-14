<?php

namespace App\Http\Responses\Backend\QuestionPdfs;

use App\Models\Achievements\Achievement;
use App\Models\Chapters\Chapter;
use App\Models\Lessons\Lesson;
use App\Models\Levels\Level;
use App\Models\Programs\Program;
use App\Models\Topics\Topic;
use App\Models\Units\Unit;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuestionPdfs\QuestionPdf
     */
    protected $questionpdfs;

    /**
     * @param App\Models\QuestionPdfs\QuestionPdf $questionpdfs
     */
    public function __construct($questionpdfs)
    {
        $this->questionpdfs = $questionpdfs;
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
    });$lessons= collect(Lesson::all()->toArray())->mapWithKeys(function ($item) {
        return [$item['id'] => $item['name']];
    });$units= collect(Unit::all()->toArray())->mapWithKeys(function ($item) {
        return [$item['id'] => $item['name']];
    });$chapters= collect(Chapter::all()->toArray())->mapWithKeys(function ($item) {
        return [$item['id'] => $item['name']];
    });$topics= collect(Topic::all()->toArray())->mapWithKeys(function ($item) {
        return [$item['id'] => $item['name']];
    });$achievements= collect(Achievement::all()->toArray())->mapWithKeys(function ($item) {
        return [$item['id'] => $item['name']];
    });
        
        return view('backend.questionpdfs.edit', compact('programs', 'levels', 'lessons', 'units', 'chapters', 'topics', 'achievements', ))->with([
            'questionpdfs' => $this->questionpdfs
        ]);
    }
}
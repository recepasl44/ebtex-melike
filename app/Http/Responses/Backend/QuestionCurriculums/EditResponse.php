<?php

namespace App\Http\Responses\Backend\QuestionCurriculums;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Questions\Question;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuestionCurriculums\QuestionCurriculum
     */
    protected $questioncurriculums;

    /**
     * @param App\Models\QuestionCurriculums\QuestionCurriculum $questioncurriculums
     */
    public function __construct($questioncurriculums)
    {
        $this->questioncurriculums = $questioncurriculums;
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
        $questions= collect(Question::all()->toArray())->mapWithKeys(function ($item) {
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
        return view('backend.questioncurriculums.edit',compact('questions', 'lessons', 'units', 'chapters', 'topics', 'achievements', ))->with([
            'questioncurriculums' => $this->questioncurriculums
        ]);
    }
}
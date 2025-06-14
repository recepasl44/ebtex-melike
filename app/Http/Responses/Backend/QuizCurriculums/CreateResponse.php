<?php

namespace App\Http\Responses\Backend\QuizCurriculums;

use Illuminate\Contracts\Support\Responsable;
use App\Models\QuizTypes\QuizType;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;


class CreateResponse implements Responsable
{
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
        
        return view('backend.quizcurriculums.create',compact('quiztypes', 'lessons', 'units', 'chapters', 'topics', 'achievements', ));
    }
}
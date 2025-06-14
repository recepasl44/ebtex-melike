<?php

namespace App\Http\Responses\Backend\QuizResults;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizResults\QuizResult
     */
    protected $quizresults;

    /**
     * @param App\Models\QuizResults\QuizResult $quizresults
     */
    public function __construct($quizresults)
    {
        $this->quizresults = $quizresults;
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
        $quizzes= collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
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
        return view('backend.quizresults.edit',compact('quizzes', 'students', 'lessons', 'units', 'chapters', 'topics', 'achievements', ))->with([
            'quizresults' => $this->quizresults
        ]);
    }
}
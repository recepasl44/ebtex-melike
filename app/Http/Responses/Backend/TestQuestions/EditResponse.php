<?php

namespace App\Http\Responses\Backend\TestQuestions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tests\Test;
use App\Models\Questions\Question;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\TestQuestions\TestQuestion
     */
    protected $testquestions;

    /**
     * @param App\Models\TestQuestions\TestQuestion $testquestions
     */
    public function __construct($testquestions)
    {
        $this->testquestions = $testquestions;
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
        $tests= collect(Test::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$questions= collect(Question::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.testquestions.edit',compact('tests', 'questions', ))->with([
            'testquestions' => $this->testquestions
        ]);
    }
}
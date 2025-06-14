<?php

namespace App\Http\Responses\Backend\QuizBranches;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;
use App\Models\Branches\Branche;
use App\Models\QuizSessions\QuizSession;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\QuizBranches\QuizBranche
     */
    protected $quizbranches;

    /**
     * @param App\Models\QuizBranches\QuizBranche $quizbranches
     */
    public function __construct($quizbranches)
    {
        $this->quizbranches = $quizbranches;
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
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizsessions= collect(QuizSession::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.quizbranches.edit',compact('students', 'branches', 'quizsessions', ))->with([
            'quizbranches' => $this->quizbranches
        ]);
    }
}
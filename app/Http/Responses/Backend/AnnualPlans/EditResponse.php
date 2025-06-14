<?php

namespace App\Http\Responses\Backend\AnnualPlans;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;
use App\Models\Lessons\Lesson;
use App\Models\Units\Unit;
use App\Models\Chapters\Chapter;
use App\Models\Topics\Topic;
use App\Models\Achievements\Achievement;
use App\Models\Sources\Source;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\AnnualPlans\AnnualPlan
     */
    protected $annualplans;

    /**
     * @param App\Models\AnnualPlans\AnnualPlan $annualplans
     */
    public function __construct($annualplans)
    {
        $this->annualplans = $annualplans;
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
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
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
                });$sources= collect(Source::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.annualplans.edit',compact('users', 'lessons', 'units', 'chapters', 'topics', 'achievements', 'sources', ))->with([
            'annualplans' => $this->annualplans
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Points;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;
use App\Models\PointTypes\PointType;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Points\Point
     */
    protected $points;

    /**
     * @param App\Models\Points\Point $points
     */
    public function __construct($points)
    {
        $this->points = $points;
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
                });$pointtypes= collect(PointType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.points.edit',compact('quizzes', 'students', 'pointtypes', ))->with([
            'points' => $this->points
        ]);
    }
}
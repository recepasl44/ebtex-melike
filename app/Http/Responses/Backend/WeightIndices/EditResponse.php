<?php

namespace App\Http\Responses\Backend\WeightIndices;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\WeightIndices\WeightIndex
     */
    protected $weightindices;

    /**
     * @param App\Models\WeightIndices\WeightIndex $weightindices
     */
    public function __construct($weightindices)
    {
        $this->weightindices = $weightindices;
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
            return [$item['id'] => $item['first_name'] . ' ' . $item['last_name']];
        });
        return view('backend.weightindices.edit',compact('students', ))->with([
            'weightindices' => $this->weightindices
        ]);
    }
}
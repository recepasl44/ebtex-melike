<?php

namespace App\Http\Responses\Backend\DiscountStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Discounts\Discount;
use App\Models\Students\Student;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\DiscountStudents\DiscountStudent
     */
    protected $discountstudents;

    /**
     * @param App\Models\DiscountStudents\DiscountStudent $discountstudents
     */
    public function __construct($discountstudents)
    {
        $this->discountstudents = $discountstudents;
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
        $discounts= collect(Discount::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.discountstudents.edit',compact('discounts', 'students', ))->with([
            'discountstudents' => $this->discountstudents
        ]);
    }
}
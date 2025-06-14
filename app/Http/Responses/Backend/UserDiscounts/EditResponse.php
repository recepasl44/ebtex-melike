<?php

namespace App\Http\Responses\Backend\UserDiscounts;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Seasons\Season;
use App\Models\Branches\Branche;
use App\Models\Students\Student;
use App\Models\Discounts\Discount;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\UserDiscounts\UserDiscount
     */
    protected $userdiscounts;

    /**
     * @param App\Models\UserDiscounts\UserDiscount $userdiscounts
     */
    public function __construct($userdiscounts)
    {
        $this->userdiscounts = $userdiscounts;
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
        $seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$discounts= collect(Discount::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.userdiscounts.edit',compact('seasons', 'branches', 'students', 'discounts', 'users', ))->with([
            'userdiscounts' => $this->userdiscounts
        ]);
    }
}
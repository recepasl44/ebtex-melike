<?php

namespace App\Http\Responses\Backend\TestAttendances;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Tests\Test;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\TestAttendances\TestAttendance
     */
    protected $testattendances;

    /**
     * @param App\Models\TestAttendances\TestAttendance $testattendances
     */
    public function __construct($testattendances)
    {
        $this->testattendances = $testattendances;
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
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.testattendances.edit',compact('tests', 'users', ))->with([
            'testattendances' => $this->testattendances
        ]);
    }
}
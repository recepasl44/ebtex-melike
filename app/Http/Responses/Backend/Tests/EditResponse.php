<?php

namespace App\Http\Responses\Backend\Tests;

use Illuminate\Contracts\Support\Responsable;
use App\Models\TestTypes\TestType;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Tests\Test
     */
    protected $tests;

    /**
     * @param App\Models\Tests\Test $tests
     */
    public function __construct($tests)
    {
        $this->tests = $tests;
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
        $testtypes= collect(TestType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.tests.edit',compact('testtypes', ))->with([
            'tests' => $this->tests
        ]);
    }
}
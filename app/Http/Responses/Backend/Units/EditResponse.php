<?php

namespace App\Http\Responses\Backend\Units;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Lessons\Lesson;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Units\Unit
     */
    protected $units;

    /**
     * @param App\Models\Units\Unit $units
     */
    public function __construct($units)
    {
        $this->units = $units;
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
        $lessons= collect(Lesson::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.units.edit',compact('lessons', ))->with([
            'units' => $this->units
        ]);
    }
}
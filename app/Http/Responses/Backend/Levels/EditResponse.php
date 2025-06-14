<?php

namespace App\Http\Responses\Backend\Levels;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Programs\Program;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Levels\Level
     */
    protected $levels;

    /**
     * @param App\Models\Levels\Level $levels
     */
    public function __construct($levels)
    {
        $this->levels = $levels;
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
        $programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.levels.edit',compact('programs', ))->with([
            'levels' => $this->levels
        ]);
    }
}
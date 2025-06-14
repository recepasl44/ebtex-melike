<?php

namespace App\Http\Responses\Backend\Chapters;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Units\Unit;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Chapters\Chapter
     */
    protected $chapters;

    /**
     * @param App\Models\Chapters\Chapter $chapters
     */
    public function __construct($chapters)
    {
        $this->chapters = $chapters;
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
        $units= collect(Unit::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.chapters.edit',compact('units', ))->with([
            'chapters' => $this->chapters
        ]);
    }
}
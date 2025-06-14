<?php

namespace App\Http\Responses\Backend\Classes;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Institutions\Institution;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Classes\Class
     */
    protected $classes;

    /**
     * @param App\Models\Classes\Class $classes
     */
    public function __construct($classes)
    {
        $this->classes = $classes;
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
        $institutions= collect(Institution::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.classes.edit',compact('institutions', ))->with([
            'classes' => $this->classes
        ]);
    }
}
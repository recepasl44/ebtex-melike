<?php

namespace App\Http\Responses\Backend\Services;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Levels\Level;
use App\Models\Courses\Course;
use App\Models\Programs\Program;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Services\Service
     */
    protected $services;

    /**
     * @param App\Models\Services\Service $services
     */
    public function __construct($services)
    {
        $this->services = $services;
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
        $branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$courses= collect(Course::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.services.edit',compact('branches', 'levels', 'courses', 'programs', ))->with([
            'services' => $this->services
        ]);
    }
}
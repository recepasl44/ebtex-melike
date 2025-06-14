<?php

namespace App\Http\Responses\Backend\ClassRooms;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Schools\School;
use App\Models\Levels\Level;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ClassRooms\ClassRoom
     */
    protected $classrooms;

    /**
     * @param App\Models\ClassRooms\ClassRoom $classrooms
     */
    public function __construct($classrooms)
    {
        $this->classrooms = $classrooms;
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
                });$schools= collect(School::limit(5)->get()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.classrooms.edit',compact('branches', 'schools', 'levels', ))->with([
            'classrooms' => $this->classrooms
        ]);
    }
}
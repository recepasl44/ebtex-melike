<?php

namespace App\Http\Responses\Backend\Events;

use Illuminate\Contracts\Support\Responsable;
use App\Models\EventTypes\EventType;
use App\Models\GroupTypes\GroupType;
use App\Models\Groups\Group;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\UsedAreas\UsedArea;
use App\Models\Teachers\Teacher;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $eventtypes= collect(EventType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$grouptypes= collect(GroupType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$groups= collect(Group::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$usedareas= collect(UsedArea::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$teachers= collect(Teacher::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.events.create',compact('eventtypes', 'grouptypes', 'groups', 'programs', 'levels', 'usedareas', 'teachers', ));
    }
}
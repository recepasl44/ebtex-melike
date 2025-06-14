<?php

namespace App\Http\Responses\Backend\Attendances;

use Illuminate\Contracts\Support\Responsable;
use App\Models\GroupTypes\GroupType;
use App\Models\Groups\Group;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\UsedAreas\UsedArea;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Attendances\Attendance
     */
    protected $attendances;

    /**
     * @param App\Models\Attendances\Attendance $attendances
     */
    public function __construct($attendances)
    {
        $this->attendances = $attendances;
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
        $grouptypes= collect(GroupType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$groups= collect(Group::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$usedareas= collect(UsedArea::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.attendances.edit',compact('grouptypes', 'groups', 'programs', 'levels', 'usedareas', ))->with([
            'attendances' => $this->attendances
        ]);
    }
}
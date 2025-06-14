<?php

namespace App\Http\Responses\Backend\Teams;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Teams\Team;
use App\Models\Organizations\Organization;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Teams\Team
     */
    protected $teams;

    /**
     * @param App\Models\Teams\Team $teams
     */
    public function __construct($teams)
    {
        $this->teams = $teams;
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
        $parents = collect(Team::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        unset($parents[$this->teams->id]);

        $organizations = collect(Organization::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });


        return view('backend.teams.edit', compact('parents', 'organizations', ))->with([
            'teams' => $this->teams
        ]);
    }
}
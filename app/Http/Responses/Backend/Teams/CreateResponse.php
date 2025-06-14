<?php

namespace App\Http\Responses\Backend\Teams;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Teams\Team;
use App\Models\Organizations\Organization;


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
        $parents = collect(Team::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $organizations = collect(Organization::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });

        return view('backend.teams.create', compact('parents', 'organizations', ));
    }
}
<?php

namespace App\Http\Responses\Backend\TeamUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;
use App\Models\Teams\Team;


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
        $users = collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'] . ' ' . $item['last_name']];
        });
        $teams = collect(Team::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });

        return view('backend.teamusers.create', compact('users', 'teams', ));
    }
}
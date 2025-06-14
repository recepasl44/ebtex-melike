<?php

namespace App\Http\Responses\Backend\Bulletins;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;
use App\Models\Groups\Group;


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
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$groups= collect(Group::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.bulletins.create',compact('users', 'groups', ));
    }
}
<?php

namespace App\Http\Responses\Backend\SocialUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;
use App\Models\Socials\Social;


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
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        $socials = collect(Social::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });

        return view('backend.socialusers.create', compact('users', 'socials', ));
    }
}
<?php

namespace App\Http\Responses\Backend\Messages;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Conversations\Conversation;
use App\Models\Access\User\User;


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
        $conversations= collect(Conversation::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.messages.create',compact('conversations', 'users', ));
    }
}
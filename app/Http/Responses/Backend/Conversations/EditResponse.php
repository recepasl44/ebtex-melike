<?php

namespace App\Http\Responses\Backend\Conversations;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Conversations\Conversation
     */
    protected $conversations;

    /**
     * @param App\Models\Conversations\Conversation $conversations
     */
    public function __construct($conversations)
    {
        $this->conversations = $conversations;
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
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.conversations.edit',compact('users', 'users', ))->with([
            'conversations' => $this->conversations
        ]);
    }
}
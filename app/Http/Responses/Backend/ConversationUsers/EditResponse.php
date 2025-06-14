<?php

namespace App\Http\Responses\Backend\ConversationUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Conversations\Conversation;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ConversationUsers\ConversationUser
     */
    protected $conversationusers;

    /**
     * @param App\Models\ConversationUsers\ConversationUser $conversationusers
     */
    public function __construct($conversationusers)
    {
        $this->conversationusers = $conversationusers;
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
        $conversations= collect(Conversation::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.conversationusers.edit',compact('conversations', 'users', ))->with([
            'conversationusers' => $this->conversationusers
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Messages;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Conversations\Conversation;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Messages\Message
     */
    protected $messages;

    /**
     * @param App\Models\Messages\Message $messages
     */
    public function __construct($messages)
    {
        $this->messages = $messages;
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
        return view('backend.messages.edit',compact('conversations', 'users', ))->with([
            'messages' => $this->messages
        ]);
    }
}
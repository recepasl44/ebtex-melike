<?php

namespace App\Http\Responses\Backend\Notifications;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Sources\Source;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Notifications\Notification
     */
    protected $notifications;

    /**
     * @param App\Models\Notifications\Notification $notifications
     */
    public function __construct($notifications)
    {
        $this->notifications = $notifications;
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
        $sources= collect(Source::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.notifications.edit',compact('sources', 'users', ))->with([
            'notifications' => $this->notifications
        ]);
    }
}
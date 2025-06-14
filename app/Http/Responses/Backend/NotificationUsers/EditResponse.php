<?php

namespace App\Http\Responses\Backend\NotificationUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Notifications\Notification;
use App\Models\Users\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\NotificationUsers\NotificationUser
     */
    protected $notificationusers;

    /**
     * @param App\Models\NotificationUsers\NotificationUser $notificationusers
     */
    public function __construct($notificationusers)
    {
        $this->notificationusers = $notificationusers;
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
        $notifications= collect(Notification::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.notificationusers.edit',compact('notifications', 'users', ))->with([
            'notificationusers' => $this->notificationusers
        ]);
    }
}
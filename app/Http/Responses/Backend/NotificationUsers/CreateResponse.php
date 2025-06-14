<?php

namespace App\Http\Responses\Backend\NotificationUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Notifications\Notification;
use App\Models\Users\User;


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
        $notifications= collect(Notification::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.notificationusers.create',compact('notifications', 'users', ));
    }
}
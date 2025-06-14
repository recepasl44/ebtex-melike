<?php

namespace App\Http\Responses\Backend\SmsLogs;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SmsLogs\SmsLog
     */
    protected $smslogs;

    /**
     * @param App\Models\SmsLogs\SmsLog $smslogs
     */
    public function __construct($smslogs)
    {
        $this->smslogs = $smslogs;
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
                });
        return view('backend.smslogs.edit',compact('users', ))->with([
            'smslogs' => $this->smslogs
        ]);
    }
}
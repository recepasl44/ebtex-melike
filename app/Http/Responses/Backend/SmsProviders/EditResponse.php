<?php

namespace App\Http\Responses\Backend\SmsProviders;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SmsProviders\SmsProvider
     */
    protected $smsproviders;

    /**
     * @param App\Models\SmsProviders\SmsProvider $smsproviders
     */
    public function __construct($smsproviders)
    {
        $this->smsproviders = $smsproviders;
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
        return view('backend.smsproviders.edit',compact('users', ))->with([
            'smsproviders' => $this->smsproviders
        ]);
    }
}
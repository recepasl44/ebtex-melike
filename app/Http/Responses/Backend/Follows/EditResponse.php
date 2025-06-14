<?php

namespace App\Http\Responses\Backend\Follows;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Follows\Follow
     */
    protected $follows;

    /**
     * @param App\Models\Follows\Follow $follows
     */
    public function __construct($follows)
    {
        $this->follows = $follows;
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
        $users = collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'] . ' ' . $item['last_name']];
        });
        return view('backend.follows.edit', compact('users'))->with([
            'follows' => $this->follows
        ]);
    }
}
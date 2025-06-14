<?php

namespace App\Http\Responses\Backend\Branches;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Branches\Branche
     */
    protected $branches;

    /**
     * @param App\Models\Branches\Branche $branches
     */
    public function __construct($branches)
    {
        $this->branches = $branches;
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
            return [$item['id'] => $item['first_name'] . ' ' . $item['last_name']];
        });
        return view('backend.branches.edit',compact('users', ))->with([
            'branches' => $this->branches
        ]);
    }
}
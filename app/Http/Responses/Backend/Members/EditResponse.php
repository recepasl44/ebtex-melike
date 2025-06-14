<?php

namespace App\Http\Responses\Backend\Members;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Members\Member
     */
    protected $members;

    /**
     * @param App\Models\Members\Member $members
     */
    public function __construct($members)
    {
        $this->members = $members;
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
        $status = [
            0 => _tr('labels.backend.members.table.passive'),
            1 => _tr('labels.backend.members.table.active')
        ];

        return view('backend.members.edit')->with([
            'members' => $this->members,
            'status' => $status,
        ]);
    }
}
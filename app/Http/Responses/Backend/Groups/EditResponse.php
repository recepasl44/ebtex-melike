<?php

namespace App\Http\Responses\Backend\Groups;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Groups\Group
     */
    protected $groups;

    /**
     * @param App\Models\Groups\Group $groups
     */
    public function __construct($groups)
    {
        $this->groups = $groups;
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
        
        return view('backend.groups.edit',)->with([
            'groups' => $this->groups
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Projects;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Projects\Project
     */
    protected $projects;

    /**
     * @param App\Models\Projects\Project $projects
     */
    public function __construct($projects)
    {
        $this->projects = $projects;
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
            0 => _tr('labels.backend.projects.table.passive'),
            1 => _tr('labels.backend.projects.table.active')
        ];
        return view('backend.projects.edit')->with([
            'projects' => $this->projects,
            'status' => $status,
        ]);
    }
}
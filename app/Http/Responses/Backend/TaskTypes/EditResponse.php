<?php

namespace App\Http\Responses\Backend\TaskTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\TaskTypes\TaskType
     */
    protected $tasktypes;

    /**
     * @param App\Models\TaskTypes\TaskType $tasktypes
     */
    public function __construct($tasktypes)
    {
        $this->tasktypes = $tasktypes;
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
        
        return view('backend.tasktypes.edit',)->with([
            'tasktypes' => $this->tasktypes
        ]);
    }
}
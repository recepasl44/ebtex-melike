<?php

namespace App\Http\Responses\Backend\Models;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Models\Model
     */
    protected $models;

    /**
     * @param App\Models\Models\Model $models
     */
    public function __construct($models)
    {
        $this->models = $models;
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
        
        return view('backend.models.edit',)->with([
            'models' => $this->models
        ]);
    }
}
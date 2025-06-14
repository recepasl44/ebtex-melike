<?php

namespace App\Http\Responses\Backend\Writers;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Writers\Writer
     */
    protected $writers;

    /**
     * @param App\Models\Writers\Writer $writers
     */
    public function __construct($writers)
    {
        $this->writers = $writers;
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
        
        return view('backend.writers.edit',)->with([
            'writers' => $this->writers
        ]);
    }
}
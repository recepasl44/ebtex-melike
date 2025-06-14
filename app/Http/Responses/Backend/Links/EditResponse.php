<?php

namespace App\Http\Responses\Backend\Links;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Links\Link
     */
    protected $links;

    /**
     * @param App\Models\Links\Link $links
     */
    public function __construct($links)
    {
        $this->links = $links;
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
        
        return view('backend.links.edit')->with([
            'links' => $this->links
        ]);
    }
}
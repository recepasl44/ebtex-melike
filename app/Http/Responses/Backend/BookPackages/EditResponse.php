<?php

namespace App\Http\Responses\Backend\BookPackages;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\BookPackages\BookPackage
     */
    protected $bookpackages;

    /**
     * @param App\Models\BookPackages\BookPackage $bookpackages
     */
    public function __construct($bookpackages)
    {
        $this->bookpackages = $bookpackages;
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
        
        return view('backend.bookpackages.edit',)->with([
            'bookpackages' => $this->bookpackages
        ]);
    }
}
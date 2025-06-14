<?php

namespace App\Http\Responses\Backend\ProductTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ProductTypes\ProductType
     */
    protected $producttypes;

    /**
     * @param App\Models\ProductTypes\ProductType $producttypes
     */
    public function __construct($producttypes)
    {
        $this->producttypes = $producttypes;
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
        
        return view('backend.producttypes.edit')->with([
            'producttypes' => $this->producttypes
        ]);
    }
}
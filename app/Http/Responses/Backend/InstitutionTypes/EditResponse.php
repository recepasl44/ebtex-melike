<?php

namespace App\Http\Responses\Backend\InstitutionTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\InstitutionTypes\InstitutionType
     */
    protected $institutiontypes;

    /**
     * @param App\Models\InstitutionTypes\InstitutionType $institutiontypes
     */
    public function __construct($institutiontypes)
    {
        $this->institutiontypes = $institutiontypes;
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
        
        return view('backend.institutiontypes.edit',)->with([
            'institutiontypes' => $this->institutiontypes
        ]);
    }
}
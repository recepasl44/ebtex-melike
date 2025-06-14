<?php

namespace App\Http\Responses\Backend\Institutions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\InstitutionTypes\InstitutionType;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Institutions\Institution
     */
    protected $institutions;

    /**
     * @param App\Models\Institutions\Institution $institutions
     */
    public function __construct($institutions)
    {
        $this->institutions = $institutions;
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
        $institutiontypes= collect(InstitutionType::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.institutions.edit',compact('institutiontypes', ))->with([
            'institutions' => $this->institutions
        ]);
    }
}
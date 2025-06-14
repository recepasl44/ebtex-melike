<?php

namespace App\Http\Responses\Backend\ContractTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\ContractTypes\ContractType
     */
    protected $contracttypes;

    /**
     * @param App\Models\ContractTypes\ContractType $contracttypes
     */
    public function __construct($contracttypes)
    {
        $this->contracttypes = $contracttypes;
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
        
        return view('backend.contracttypes.edit',)->with([
            'contracttypes' => $this->contracttypes
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\SocialTypes;

use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\SocialTypes\SocialType
     */
    protected $socialtypes;

    /**
     * @param App\Models\SocialTypes\SocialType $socialtypes
     */
    public function __construct($socialtypes)
    {
        $this->socialtypes = $socialtypes;
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
        
        return view('backend.socialtypes.edit',)->with([
            'socialtypes' => $this->socialtypes
        ]);
    }
}
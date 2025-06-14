<?php

namespace App\Http\Responses\Backend\FieldManagers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Roles\Role;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\FieldManagers\FieldManager
     */
    protected $fieldmanagers;

    /**
     * @param App\Models\FieldManagers\FieldManager $fieldmanagers
     */
    public function __construct($fieldmanagers)
    {
        $this->fieldmanagers = $fieldmanagers;
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
        $roles= collect(Role::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.fieldmanagers.edit',compact('roles', ))->with([
            'fieldmanagers' => $this->fieldmanagers
        ]);
    }
}
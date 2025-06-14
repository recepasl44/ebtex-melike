<?php

namespace App\Http\Responses\Backend\Organizations;

use App\Models\Access\User\User;
use App\Models\OrganizationCategories\OrganizationCategory;
use App\Models\OrganizationTypes\OrganizationType;
use Illuminate\Contracts\Support\Responsable;


class CreateResponse implements Responsable
{
    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $users = User::all()->pluck('first_name','id');
        $types = OrganizationType::all()->pluck('name','id');
        $categories = OrganizationCategory::all()->pluck('name','id');

        return view('backend.organizations.create',compact('users', 'types', 'categories'));
    }
}
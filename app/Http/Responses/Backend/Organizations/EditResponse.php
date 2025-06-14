<?php

namespace App\Http\Responses\Backend\Organizations;

use App\Models\Access\User\User;
use App\Models\OrganizationCategories\OrganizationCategory;
use App\Models\OrganizationTypes\OrganizationType;
use Illuminate\Contracts\Support\Responsable;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Organizations\Organization
     */
    protected $organizations;

    /**
     * @param App\Models\Organizations\Organization $organizations
     */
    public function __construct($organizations)
    {
        $this->organizations = $organizations;
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
        $users = User::all()->pluck('first_name','id');
        $types = OrganizationType::all()->pluck('name','id');
        $categories = OrganizationCategory::all()->pluck('name','id');
        
        return view('backend.organizations.edit',compact('users', 'types', 'categories'))->with([
            'organizations' => $this->organizations
        ]);
    }
}
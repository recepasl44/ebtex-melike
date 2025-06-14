<?php

namespace App\Http\Responses\Backend\OrganizationLinks;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Organizations\Organization;
use App\Models\Links\Link;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OrganizationLinks\OrganizationLink
     */
    protected $organizationlinks;

    /**
     * @param App\Models\OrganizationLinks\OrganizationLink $organizationlinks
     */
    public function __construct($organizationlinks)
    {
        $this->organizationlinks = $organizationlinks;
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
        $organizations=collect(Organization::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$links=collect(Link::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.organizationlinks.edit',compact('organizations', 'links', ))->with([
            'organizationlinks' => $this->organizationlinks
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\OrganizationLinks;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Organizations\Organization;
use App\Models\Links\Link;


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
        $organizations=collect(Organization::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$links=collect(Link::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.organizationlinks.create',compact('organizations', 'links', ));
    }
}
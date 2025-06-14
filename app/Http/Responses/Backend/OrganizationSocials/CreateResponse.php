<?php

namespace App\Http\Responses\Backend\OrganizationSocials;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Organizations\Organization;
use App\Models\Socials\Social;


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
                });$socials=collect(Social::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.organizationsocials.create',compact('organizations', 'socials', ));
    }
}
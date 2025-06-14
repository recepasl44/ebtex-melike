<?php

namespace App\Http\Responses\Backend\OrganizationSocials;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Organizations\Organization;
use App\Models\Socials\Social;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\OrganizationSocials\OrganizationSocial
     */
    protected $organizationsocials;

    /**
     * @param App\Models\OrganizationSocials\OrganizationSocial $organizationsocials
     */
    public function __construct($organizationsocials)
    {
        $this->organizationsocials = $organizationsocials;
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
                });$socials=collect(Social::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.organizationsocials.edit',compact('organizations', 'socials', ))->with([
            'organizationsocials' => $this->organizationsocials
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\FeatureUsers;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Features\Feature;
use App\Models\Access\User\User;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\FeatureUsers\FeatureUser
     */
    protected $featureusers;

    /**
     * @param App\Models\FeatureUsers\FeatureUser $featureusers
     */
    public function __construct($featureusers)
    {
        $this->featureusers = $featureusers;
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
        $features = collect(Feature::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $users = collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'] . ' ' . $item['last_name']];
        });
        return view('backend.featureusers.edit', compact('features', 'users', ))->with([
            'featureusers' => $this->featureusers
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Features;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Features\Feature;


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
        $parents = collect(Feature::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });

        $types = [
            1 => _tr('skills'),
            2 => _tr('interests'),
            3 => _tr('availabilities'),
            4 => _tr('goals'),
            5 => _tr('agreements'),
            6 => _tr('team_titles'),
        ];

        return view('backend.features.create', compact('parents', 'types'));
    }
}
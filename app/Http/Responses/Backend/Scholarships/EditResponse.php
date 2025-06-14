<?php

namespace App\Http\Responses\Backend\Scholarships;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Seasons\Season;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Scholarships\Scholarship
     */
    protected $scholarships;

    /**
     * @param App\Models\Scholarships\Scholarship $scholarships
     */
    public function __construct($scholarships)
    {
        $this->scholarships = $scholarships;
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
        $branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.scholarships.edit',compact('branches', 'seasons', ))->with([
            'scholarships' => $this->scholarships
        ]);
    }
}
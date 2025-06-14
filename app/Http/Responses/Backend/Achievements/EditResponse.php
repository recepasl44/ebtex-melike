<?php

namespace App\Http\Responses\Backend\Achievements;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Topics\Topic;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Achievements\Achievement
     */
    protected $achievements;

    /**
     * @param App\Models\Achievements\Achievement $achievements
     */
    public function __construct($achievements)
    {
        $this->achievements = $achievements;
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
        $topics= collect(Topic::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.achievements.edit',compact('topics', ))->with([
            'achievements' => $this->achievements
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\Topics;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Chapters\Chapter;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Topics\Topic
     */
    protected $topics;

    /**
     * @param App\Models\Topics\Topic $topics
     */
    public function __construct($topics)
    {
        $this->topics = $topics;
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
        $chapters= collect(Chapter::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.topics.edit',compact('chapters', ))->with([
            'topics' => $this->topics
        ]);
    }
}
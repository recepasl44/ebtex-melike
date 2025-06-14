<?php

namespace App\Http\Responses\Backend\Words;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Words\Word
     */
    protected $words;

    /**
     * @param App\Models\Words\Word $words
     */
    public function __construct($words)
    {
        $this->words = $words;
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
        foreach (array_keys(config('locale.languages')) as $key => $l) {
            $langs[$l] = _tr('labels.backend.words.table.'.$l);
        }
        return view('backend.words.edit')->with([
            'words' => $this->words,
            'langs' => $langs,
        ]);
    }
}
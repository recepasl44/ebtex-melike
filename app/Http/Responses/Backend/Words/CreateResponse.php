<?php

namespace App\Http\Responses\Backend\Words;

use Illuminate\Contracts\Support\Responsable;

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
        foreach (array_keys(config('locale.languages')) as $key => $l) {
            $langs[$l] = _tr('labels.backend.words.table.'.$l);
        }
        return view('backend.words.create',[
            'langs' => $langs
        ]);
    }
}
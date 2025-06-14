<?php

namespace App\Http\Responses\Backend\Videos;

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
        $status = [
            0 => _tr('labels.backend.videos.table.inactive'),
            1 => _tr('labels.backend.videos.table.published'),
            2 => _tr('labels.backend.videos.table.draft'),
            3 => _tr('labels.backend.videos.table.scheduled'),
        ];
        $types =[
            0 => _tr('labels.backend.videos.table.lesson'),
            1 => _tr('labels.backend.videos.table.question'),
            2 => _tr('labels.backend.videos.table.solution'),
        ];
        $sites =[
            0 => _tr('labels.backend.videos.table.vimeo'),
            1 => _tr('labels.backend.videos.table.youtube'),
            2 => _tr('labels.backend.videos.table.other'),
        ];
        return view('backend.videos.create',['status' => $status, 'types' => $types, 'sites' => $sites]);
    }
}
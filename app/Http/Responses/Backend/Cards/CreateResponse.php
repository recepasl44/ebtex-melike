<?php

namespace App\Http\Responses\Backend\Cards;

use App\Models\Cards\Card;
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
        $statuses = [
            0 => _tr('labels.backend.cards.table.passive'),
            1 => _tr('labels.backend.cards.table.active')
        ];
        $types = [
            0 => _tr('labels.backend.cards.table.service'),
            1 => _tr('labels.backend.cards.table.solution'),
            2 => _tr('labels.backend.cards.table.features'),
            3 => _tr('labels.backend.cards.table.prices'),
            4 => _tr('labels.backend.cards.table.products'),
            5 => _tr('labels.backend.cards.table.gallery'),
        ];

        $parents = Card::pluck('title', 'id')->all();
        return view('backend.cards.create',compact('statuses','types', 'parents'));
    }
}
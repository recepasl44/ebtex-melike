<?php

namespace App\Http\Responses\Backend\Cards;

use App\Models\Cards\Card;
use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Cards\Card
     */
    protected $cards;

    /**
     * @param App\Models\Cards\Card $cards
     */
    public function __construct($cards)
    {
        $this->cards = $cards;
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
        $parents = Card::whereNot('id', $this->cards->id)->pluck('title', 'id');
        return view('backend.cards.edit')->with([
            'cards' => $this->cards,
            'statuses' => $statuses,
            'types' => $types,
            'parents' => $parents,
        ]);
    }
}
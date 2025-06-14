<?php

namespace App\Http\Controllers\Backend\Cards;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Cards\CardRepository;
use App\Http\Requests\Backend\Cards\ManageCardRequest;
use Illuminate\Support\Facades\Storage;

/**
 * Class CardsTableController.
 */
class CardsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var CardRepository
     */
    protected $card;
    protected $status;
    protected $types;

    /**
     * contructor to initialize repository object
     * @param CardRepository $card;
     */
    public function __construct(CardRepository $card)
    {
        $this->card = $card;
        $this->status = [
            0 => _tr('labels.backend.cards.table.passive'),
            1 => _tr('labels.backend.cards.table.active')
        ];
        $this->types = [
            0 => _tr('labels.backend.cards.table.service'),
            1 => _tr('labels.backend.cards.table.solution'),
            2 => _tr('labels.backend.cards.table.features'),
            3 => _tr('labels.backend.cards.table.prices'),
            4 => _tr('labels.backend.cards.table.products'),
            5 => _tr('labels.backend.cards.table.gallery'),
        ];
    }

    /**
     * This method return the data of the model
     * @param ManageCardRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageCardRequest $request)
    {
        return Datatables::of($this->card->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($card) {
                return Carbon::parseToDate($card->created_at);
            })
            ->addColumn('lang', function ($card) {
                return $card->language_label ?? '';
            })
            ->addColumn('parent', function ($card) {
                return $card->parent?->title ?? '';
            })
            ->addColumn('status', function ($card) {
                return isset($this->status[$card->status]) ? $this->status[$card->status] : NULL;
            })
            ->addColumn('type', function ($card) {
                return isset($this->types[$card->type]) ? $this->types[$card->type] : NULL;
            })
            ->addColumn('icon', function ($card) {
                return $card->icon?'<img height="50" width="50" src="'.Storage::disk('public')->url($card->icon).'">':'';
            })
            ->addColumn('actions', function ($card) {
                return $card->action_buttons;
            })
            ->make(true);
    }
}

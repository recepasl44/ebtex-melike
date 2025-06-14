<?php

namespace App\Repositories\Backend\Cards;

use DB;
use App\Supports\Carbon;
use App\Models\Cards\Card;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class CardRepository.
 */
class CardRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Card::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.cards.table').'.id',
                config('module.cards.table').'.parent_id',
                config('module.cards.table').'.lang',
                config('module.cards.table').'.title',
                config('module.cards.table').'.subtitle',
                config('module.cards.table').'.slug',
                config('module.cards.table').'.icon',
                config('module.cards.table').'.cover',
                config('module.cards.table').'.description',
                config('module.cards.table').'.link',
                config('module.cards.table').'.type',
                config('module.cards.table').'.order_by',
                config('module.cards.table').'.status',
                config('module.cards.table').'.created_at',
                config('module.cards.table').'.updated_at',
            ]);
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        if(!empty($input['title'])){
            $input['slug'] = Str::slug($input['title']);
        }

        if (Card::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.cards.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Card $card
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Card $card, array $input)
    {
        if(!empty($input['title'])){
            $input['slug'] = Str::slug($input['title']);
        }
    	if ($card->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.cards.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Card $card
     * @throws GeneralException
     * @return bool
     */
    public function delete(Card $card)
    {
        if ($card->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.cards.delete_error'));
    }
}

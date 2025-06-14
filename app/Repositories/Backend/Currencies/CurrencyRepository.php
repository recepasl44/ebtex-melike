<?php

namespace App\Repositories\Backend\Currencies;

use DB;
use Carbon\Carbon;
use App\Models\Currencies\Currency;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CurrencyRepository.
 */
class CurrencyRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Currency::class;

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
                config('module.currencies.table').'.id',
                config('module.currencies.table').'.name',
				config('module.currencies.table').'.code',
				config('module.currencies.table').'.symbol',
				config('module.currencies.table').'.decimal_places',
				config('module.currencies.table').'.exchange_rate',
				config('module.currencies.table').'.status',
				
                config('module.currencies.table').'.created_at',
                config('module.currencies.table').'.updated_at',
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
        if (Currency::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.currencies.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Currency $currency
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Currency $currency, array $input)
    {
    	if ($currency->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.currencies.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Currency $currency
     * @throws GeneralException
     * @return bool
     */
    public function delete(Currency $currency)
    {
        if ($currency->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.currencies.delete_error'));
    }
}

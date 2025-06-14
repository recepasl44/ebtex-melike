<?php

namespace App\Repositories\Backend\Discounts;

use DB;
use Carbon\Carbon;
use App\Models\Discounts\Discount;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DiscountRepository.
 */
class DiscountRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Discount::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.discounts.table').'.id',
                config('module.discounts.table').'.name',
				config('module.discounts.table').'.is_seasonal',
				config('module.discounts.table').'.type',
				config('module.discounts.table').'.discount_type',
				config('module.discounts.table').'.service_id',
				config('module.discounts.table').'.amount',
				
                config('module.discounts.table').'.created_at',
                config('module.discounts.table').'.updated_at',
            ]);
        if(request()->has('service_id') && !empty(request()->get('service_id'))){
            $data = $data->where('service_id', request()->get('service_id'));
        }
        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
        }
        return $data;
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
        if (Discount::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.discounts.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Discount $discount
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Discount $discount, array $input)
    {
    	if ($discount->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.discounts.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Discount $discount
     * @throws GeneralException
     * @return bool
     */
    public function delete(Discount $discount)
    {
        if ($discount->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.discounts.delete_error'));
    }
}

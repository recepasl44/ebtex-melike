<?php

namespace App\Repositories\Backend\UserDiscounts;

use DB;
use Carbon\Carbon;
use App\Models\UserDiscounts\UserDiscount;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UserDiscountRepository.
 */
class UserDiscountRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = UserDiscount::class;

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
                config('module.userdiscounts.table').'.id',
                config('module.userdiscounts.table').'.season_id',
				config('module.userdiscounts.table').'.branche_id',
				config('module.userdiscounts.table').'.student_id',
				config('module.userdiscounts.table').'.discount_id',
				config('module.userdiscounts.table').'.created_by',
				
                config('module.userdiscounts.table').'.created_at',
                config('module.userdiscounts.table').'.updated_at',
            ]);
        if(request()->has('season_id') && !empty(request()->get('season_id'))){
            $data = $data->where('season_id', request()->get('season_id'));
        }
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('discount_id') && !empty(request()->get('discount_id'))){
            $data = $data->where('discount_id', request()->get('discount_id'));
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
        if (UserDiscount::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.userdiscounts.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param UserDiscount $userdiscount
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(UserDiscount $userdiscount, array $input)
    {
    	if ($userdiscount->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.userdiscounts.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param UserDiscount $userdiscount
     * @throws GeneralException
     * @return bool
     */
    public function delete(UserDiscount $userdiscount)
    {
        if ($userdiscount->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.userdiscounts.delete_error'));
    }
}

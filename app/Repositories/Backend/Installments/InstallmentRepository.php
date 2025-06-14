<?php

namespace App\Repositories\Backend\Installments;

use DB;
use Carbon\Carbon;
use App\Models\Installments\Installment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstallmentRepository.
 */
class InstallmentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Installment::class;

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
                config('module.installments.table').'.id',
                config('module.installments.table').'.enrollment_id',
				config('module.installments.table').'.amount',
				config('module.installments.table').'.order_no',
				config('module.installments.table').'.due_date',
				config('module.installments.table').'.is_paid',
				config('module.installments.table').'.payment_date',
				
                config('module.installments.table').'.created_at',
                config('module.installments.table').'.updated_at',
            ]);
        if(request()->has('enrollment_id') && !empty(request()->get('enrollment_id'))){
            $data = $data->where('enrollment_id', request()->get('enrollment_id'));
        }
        if(request()->has('is_paid') && !empty(request()->get('is_paid'))){
            $data = $data->where('is_paid', request()->get('is_paid'));
        }
        if(request()->has('order_no') && !empty(request()->get('order_no'))){
            $data = $data->where('order_no', request()->get('order_no'));
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
        if (Installment::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.installments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Installment $installment
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Installment $installment, array $input)
    {
    	if ($installment->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.installments.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Installment $installment
     * @throws GeneralException
     * @return bool
     */
    public function delete(Installment $installment)
    {
        if ($installment->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.installments.delete_error'));
    }
}

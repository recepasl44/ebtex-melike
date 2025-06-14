<?php

namespace App\Repositories\Backend\PaymentStatuses;

use DB;
use Carbon\Carbon;
use App\Models\PaymentStatuses\PaymentStatus;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PaymentStatusRepository.
 */
class PaymentStatusRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = PaymentStatus::class;

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
                config('module.paymentstatuses.table').'.id',
                config('module.paymentstatuses.table').'.name',
				
                config('module.paymentstatuses.table').'.created_at',
                config('module.paymentstatuses.table').'.updated_at',
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
        if (PaymentStatus::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.paymentstatuses.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param PaymentStatus $paymentstatus
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(PaymentStatus $paymentstatus, array $input)
    {
    	if ($paymentstatus->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.paymentstatuses.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param PaymentStatus $paymentstatus
     * @throws GeneralException
     * @return bool
     */
    public function delete(PaymentStatus $paymentstatus)
    {
        if ($paymentstatus->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.paymentstatuses.delete_error'));
    }
}

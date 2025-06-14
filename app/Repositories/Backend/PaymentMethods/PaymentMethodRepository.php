<?php

namespace App\Repositories\Backend\PaymentMethods;

use DB;
use Carbon\Carbon;
use App\Models\PaymentMethods\PaymentMethod;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PaymentMethodRepository.
 */
class PaymentMethodRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = PaymentMethod::class;

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
                config('module.paymentmethods.table').'.id',
                config('module.paymentmethods.table').'.name',
				config('module.paymentmethods.table').'.type',
                config('module.paymentmethods.table').'.created_at',
                config('module.paymentmethods.table').'.updated_at',
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
        if (PaymentMethod::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.paymentmethods.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param PaymentMethod $paymentmethod
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(PaymentMethod $paymentmethod, array $input)
    {
    	if ($paymentmethod->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.paymentmethods.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param PaymentMethod $paymentmethod
     * @throws GeneralException
     * @return bool
     */
    public function delete(PaymentMethod $paymentmethod)
    {
        if ($paymentmethod->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.paymentmethods.delete_error'));
    }
}

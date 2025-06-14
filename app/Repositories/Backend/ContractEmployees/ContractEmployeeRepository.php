<?php

namespace App\Repositories\Backend\ContractEmployees;

use DB;
use Carbon\Carbon;
use App\Models\ContractEmployees\ContractEmployee;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContractEmployeeRepository.
 */
class ContractEmployeeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ContractEmployee::class;

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
                config('module.contractemployees.table').'.id',
                config('module.contractemployees.table').'.employee_id',
				config('module.contractemployees.table').'.contract_type_id',
				config('module.contractemployees.table').'.start_date',
				config('module.contractemployees.table').'.work_days',
				config('module.contractemployees.table').'.fixed_salary',
				config('module.contractemployees.table').'.number_of_lessons',
				config('module.contractemployees.table').'.lesson_price',
				config('module.contractemployees.table').'.day_price',
				config('module.contractemployees.table').'.solution_price',
				config('module.contractemployees.table').'.coaching_price',
				config('module.contractemployees.table').'.private_lesson_price',
				config('module.contractemployees.table').'.coupon_rate',
				config('module.contractemployees.table').'.end_date',
				config('module.contractemployees.table').'.notes',
				
                config('module.contractemployees.table').'.created_at',
                config('module.contractemployees.table').'.updated_at',
            ]);
            
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
        if (ContractEmployee::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.contractemployees.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ContractEmployee $contractemployee
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ContractEmployee $contractemployee, array $input)
    {
    	if ($contractemployee->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.contractemployees.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ContractEmployee $contractemployee
     * @throws GeneralException
     * @return bool
     */
    public function delete(ContractEmployee $contractemployee)
    {
        if ($contractemployee->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.contractemployees.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\Employees;

use DB;
use Carbon\Carbon;
use App\Models\Employees\Employee;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EmployeeRepository.
 */
class EmployeeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Employee::class;

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
                config('module.employees.table').'.id',
                config('module.employees.table').'.full_name',
				config('module.employees.table').'.identification_no',
				config('module.employees.table').'.birth_day',
				config('module.employees.table').'.type_id',
				config('module.employees.table').'.email',
				config('module.employees.table').'.phone_number',
				config('module.employees.table').'.address',
				config('module.employees.table').'.gender_id',
				config('module.employees.table').'.status',
				
                config('module.employees.table').'.created_at',
                config('module.employees.table').'.updated_at',
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
        if (Employee::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.employees.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Employee $employee
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Employee $employee, array $input)
    {
    	if ($employee->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.employees.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Employee $employee
     * @throws GeneralException
     * @return bool
     */
    public function delete(Employee $employee)
    {
        if ($employee->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.employees.delete_error'));
    }
}

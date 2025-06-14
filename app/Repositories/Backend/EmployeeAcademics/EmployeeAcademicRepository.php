<?php

namespace App\Repositories\Backend\EmployeeAcademics;

use DB;
use Carbon\Carbon;
use App\Models\EmployeeAcademics\EmployeeAcademic;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EmployeeAcademicRepository.
 */
class EmployeeAcademicRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = EmployeeAcademic::class;

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
                config('module.employeeacademics.table').'.id',
                config('module.employeeacademics.table').'.employee_id',
				config('module.employeeacademics.table').'.education_status_id',
				config('module.employeeacademics.table').'.job_id',
				config('module.employeeacademics.table').'.profession_id',
				config('module.employeeacademics.table').'.academic_title_id',
				config('module.employeeacademics.table').'.experience',
				config('module.employeeacademics.table').'.certificates',
				config('module.employeeacademics.table').'.program_id',
				config('module.employeeacademics.table').'.level_id',
				
                config('module.employeeacademics.table').'.created_at',
                config('module.employeeacademics.table').'.updated_at',
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
        if (EmployeeAcademic::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.employeeacademics.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param EmployeeAcademic $employeeacademic
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(EmployeeAcademic $employeeacademic, array $input)
    {
    	if ($employeeacademic->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.employeeacademics.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param EmployeeAcademic $employeeacademic
     * @throws GeneralException
     * @return bool
     */
    public function delete(EmployeeAcademic $employeeacademic)
    {
        if ($employeeacademic->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.employeeacademics.delete_error'));
    }
}

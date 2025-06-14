<?php

namespace App\Repositories\Backend\ServiceStudents;

use DB;
use Carbon\Carbon;
use App\Models\ServiceStudents\ServiceStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceStudentRepository.
 */
class ServiceStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ServiceStudent::class;

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
                config('module.servicestudents.table').'.id',
                config('module.servicestudents.table').'.service_id',
				config('module.servicestudents.table').'.student_id',
				
                config('module.servicestudents.table').'.created_at',
                config('module.servicestudents.table').'.updated_at',
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
        if (ServiceStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.servicestudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ServiceStudent $servicestudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ServiceStudent $servicestudent, array $input)
    {
    	if ($servicestudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.servicestudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ServiceStudent $servicestudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(ServiceStudent $servicestudent)
    {
        if ($servicestudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.servicestudents.delete_error'));
    }
}

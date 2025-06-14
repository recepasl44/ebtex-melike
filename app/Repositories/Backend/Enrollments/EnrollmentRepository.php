<?php

namespace App\Repositories\Backend\Enrollments;

use DB;
use Carbon\Carbon;
use App\Models\Enrollments\Enrollment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EnrollmentRepository.
 */
class EnrollmentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Enrollment::class;

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
                config('module.enrollments.table').'.id',
                config('module.enrollments.table').'.student_id',
				config('module.enrollments.table').'.service_id',
				config('module.enrollments.table').'.total_fee',
				config('module.enrollments.table').'.discount',
				config('module.enrollments.table').'.final_fee',
				config('module.enrollments.table').'.status',
				
                config('module.enrollments.table').'.created_at',
                config('module.enrollments.table').'.updated_at',
            ]);

        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('service_id') && !empty(request()->get('service_id'))){
            $data = $data->where('service_id', request()->get('service_id'));
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
        if (Enrollment::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.enrollments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Enrollment $enrollment
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Enrollment $enrollment, array $input)
    {
    	if ($enrollment->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.enrollments.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Enrollment $enrollment
     * @throws GeneralException
     * @return bool
     */
    public function delete(Enrollment $enrollment)
    {
        if ($enrollment->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.enrollments.delete_error'));
    }
}

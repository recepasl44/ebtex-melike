<?php

namespace App\Repositories\Backend\ScholarshipApplications;

use DB;
use Carbon\Carbon;
use App\Models\ScholarshipApplications\ScholarshipApplication;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScholarshipApplicationRepository.
 */
class ScholarshipApplicationRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ScholarshipApplication::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data =  $this->query()
            ->select([
                config('module.scholarshipapplications.table').'.id',
                config('module.scholarshipapplications.table').'.student_id',
				config('module.scholarshipapplications.table').'.scholarship_id',
				
                config('module.scholarshipapplications.table').'.created_at',
                config('module.scholarshipapplications.table').'.updated_at',
            ]);
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('scholarship_id') && !empty(request()->get('scholarship_id'))){
            $data = $data->where('scholarship_id', request()->get('scholarship_id'));
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
        if (ScholarshipApplication::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scholarshipapplications.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ScholarshipApplication $scholarshipapplication
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ScholarshipApplication $scholarshipapplication, array $input)
    {
    	if ($scholarshipapplication->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scholarshipapplications.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ScholarshipApplication $scholarshipapplication
     * @throws GeneralException
     * @return bool
     */
    public function delete(ScholarshipApplication $scholarshipapplication)
    {
        if ($scholarshipapplication->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scholarshipapplications.delete_error'));
    }
}

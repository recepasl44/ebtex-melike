<?php

namespace App\Repositories\Backend\AssignmentStudents;

use DB;
use Carbon\Carbon;
use App\Models\AssignmentStudents\AssignmentStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AssignmentStudentRepository.
 */
class AssignmentStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AssignmentStudent::class;

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
                config('module.assignmentstudents.table').'.id',
                config('module.assignmentstudents.table').'.assignment_id',
				config('module.assignmentstudents.table').'.student_id',
				config('module.assignmentstudents.table').'.completion_percentage',
				config('module.assignmentstudents.table').'.delay_days',
				config('module.assignmentstudents.table').'.student_file',
				config('module.assignmentstudents.table').'.status',
				
                config('module.assignmentstudents.table').'.created_at',
                config('module.assignmentstudents.table').'.updated_at',
            ]);

        if(request()->has('assignment_id') && !empty(request()->get('assignment_id'))){
            $data = $data->where('assignment_id', request()->get('assignment_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('delay_days') && !empty(request()->get('delay_days'))){
            $data = $data->where('delay_days', request()->get('delay_days'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
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
        if (AssignmentStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.assignmentstudents.create_error'));
    }

    /**
     * For updating the respective Model in storageeS
     *
     * @param AssignmentStudent $assignmentstudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AssignmentStudent $assignmentstudent, array $input)
    {
    	if ($assignmentstudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.assignmentstudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AssignmentStudent $assignmentstudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(AssignmentStudent $assignmentstudent)
    {
        if ($assignmentstudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.assignmentstudents.delete_error'));
    }
}

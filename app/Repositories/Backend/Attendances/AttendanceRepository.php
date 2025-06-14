<?php

namespace App\Repositories\Backend\Attendances;

use DB;
use Carbon\Carbon;
use App\Models\Attendances\Attendance;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AttendanceRepository.
 */
class AttendanceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Attendance::class;

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
                config('module.attendances.table').'.id',
                config('module.attendances.table').'.name',
				config('module.attendances.table').'.group_type_id',
				config('module.attendances.table').'.group_id',
				config('module.attendances.table').'.program_id',
				config('module.attendances.table').'.level_id',
				config('module.attendances.table').'.start_date',
				config('module.attendances.table').'.end_date',
				config('module.attendances.table').'.start_time',
				config('module.attendances.table').'.teacher_id',
				config('module.attendances.table').'.responsible_id',
				config('module.attendances.table').'.duty_teacher_id',
				config('module.attendances.table').'.duty_user_id',
				config('module.attendances.table').'.status',

                config('module.attendances.table').'.created_at',
                config('module.attendances.table').'.updated_at',
            ]);

        if(request()->has('group_type_id') && !empty(request()->get('group_type_id'))){
            $data = $data->where('group_type_id', request()->get('group_type_id'));
        }
        if(request()->has('group_id') && !empty(request()->get('group_id'))){
            $data = $data->where('group_id', request()->get('group_id'));
        }
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('used_area_id') && !empty(request()->get('used_area_id'))){
            $data = $data->where('used_area_id', request()->get('used_area_id'));
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
        if (Attendance::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.attendances.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Attendance $attendance
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Attendance $attendance, array $input)
    {
    	if ($attendance->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.attendances.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Attendance $attendance
     * @throws GeneralException
     * @return bool
     */
    public function delete(Attendance $attendance)
    {
        if ($attendance->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.attendances.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\AttendanceDays;

use DB;
use Carbon\Carbon;
use App\Models\AttendanceDays\AttendanceDay;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AttendanceDayRepository.
 */
class AttendanceDayRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AttendanceDay::class;

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
                config('module.attendancedays.table').'.id',
                config('module.attendancedays.table').'.attendance_id',
				config('module.attendancedays.table').'.day_id',
				
                config('module.attendancedays.table').'.created_at',
                config('module.attendancedays.table').'.updated_at',
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
        if (AttendanceDay::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.attendancedays.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param AttendanceDay $attendanceday
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AttendanceDay $attendanceday, array $input)
    {
    	if ($attendanceday->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.attendancedays.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AttendanceDay $attendanceday
     * @throws GeneralException
     * @return bool
     */
    public function delete(AttendanceDay $attendanceday)
    {
        if ($attendanceday->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.attendancedays.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\AttendanceTeachers;

use DB;
use Carbon\Carbon;
use App\Models\AttendanceTeachers\AttendanceTeacher;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AttendanceTeacherRepository.
 */
class AttendanceTeacherRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AttendanceTeacher::class;

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
                config('module.attendanceteachers.table').'.id',
                config('module.attendanceteachers.table').'.attendance_id',
				config('module.attendanceteachers.table').'.teacher_id',
				config('module.attendanceteachers.table').'.status',
				config('module.attendanceteachers.table').'.admin_status',

                config('module.attendanceteachers.table').'.created_at',
                config('module.attendanceteachers.table').'.updated_at',
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
        if (AttendanceTeacher::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.attendanceteachers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param AttendanceTeacher $attendanceteacher
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AttendanceTeacher $attendanceteacher, array $input)
    {
    	if ($attendanceteacher->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.attendanceteachers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AttendanceTeacher $attendanceteacher
     * @throws GeneralException
     * @return bool
     */
    public function delete(AttendanceTeacher $attendanceteacher)
    {
        if ($attendanceteacher->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.attendanceteachers.delete_error'));
    }
}

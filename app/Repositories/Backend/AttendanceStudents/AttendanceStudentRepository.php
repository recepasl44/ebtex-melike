<?php

namespace App\Repositories\Backend\AttendanceStudents;

use DB;
use Carbon\Carbon;
use App\Models\AttendanceStudents\AttendanceStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AttendanceStudentRepository.
 */
class AttendanceStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AttendanceStudent::class;

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
                config('module.attendancestudents.table').'.id',
                config('module.attendancestudents.table').'.attendance_id',
				config('module.attendancestudents.table').'.student_id',
				config('module.attendancestudents.table').'.status',
				config('module.attendancestudents.table').'.admin_status',

                config('module.attendancestudents.table').'.created_at',
                config('module.attendancestudents.table').'.updated_at',
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
        if (AttendanceStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.attendancestudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param AttendanceStudent $attendancestudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AttendanceStudent $attendancestudent, array $input)
    {
    	if ($attendancestudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.attendancestudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AttendanceStudent $attendancestudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(AttendanceStudent $attendancestudent)
    {
        if ($attendancestudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.attendancestudents.delete_error'));
    }
}

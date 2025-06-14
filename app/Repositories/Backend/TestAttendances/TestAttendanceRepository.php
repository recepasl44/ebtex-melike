<?php

namespace App\Repositories\Backend\TestAttendances;

use DB;
use Carbon\Carbon;
use App\Models\TestAttendances\TestAttendance;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestAttendanceRepository.
 */
class TestAttendanceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = TestAttendance::class;

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
                config('module.testattendances.table').'.id',
                config('module.testattendances.table').'.test_id',
				config('module.testattendances.table').'.user_id',
				config('module.testattendances.table').'.is_attendance',
				
                config('module.testattendances.table').'.created_at',
                config('module.testattendances.table').'.updated_at',
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
        if (TestAttendance::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.testattendances.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param TestAttendance $testattendance
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(TestAttendance $testattendance, array $input)
    {
    	if ($testattendance->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.testattendances.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param TestAttendance $testattendance
     * @throws GeneralException
     * @return bool
     */
    public function delete(TestAttendance $testattendance)
    {
        if ($testattendance->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.testattendances.delete_error'));
    }
}

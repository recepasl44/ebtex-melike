<?php

namespace App\Repositories\Backend\StudentGroups;

use DB;
use Carbon\Carbon;
use App\Models\StudentGroups\StudentGroup;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StudentGroupRepository.
 */
class StudentGroupRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = StudentGroup::class;

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
                config('module.studentgroups.table').'.id',
                config('module.studentgroups.table').'.student_id',
				config('module.studentgroups.table').'.group_id',
				
                config('module.studentgroups.table').'.created_at',
                config('module.studentgroups.table').'.updated_at',
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
        if (StudentGroup::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.studentgroups.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param StudentGroup $studentgroup
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(StudentGroup $studentgroup, array $input)
    {
    	if ($studentgroup->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.studentgroups.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param StudentGroup $studentgroup
     * @throws GeneralException
     * @return bool
     */
    public function delete(StudentGroup $studentgroup)
    {
        if ($studentgroup->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.studentgroups.delete_error'));
    }
}

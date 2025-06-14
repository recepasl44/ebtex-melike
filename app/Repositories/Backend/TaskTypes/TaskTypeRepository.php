<?php

namespace App\Repositories\Backend\TaskTypes;

use DB;
use Carbon\Carbon;
use App\Models\TaskTypes\TaskType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskTypeRepository.
 */
class TaskTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = TaskType::class;

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
                config('module.tasktypes.table').'.id',
                config('module.tasktypes.table').'.name',
				
                config('module.tasktypes.table').'.created_at',
                config('module.tasktypes.table').'.updated_at',
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
        if (TaskType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.tasktypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param TaskType $tasktype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(TaskType $tasktype, array $input)
    {
    	if ($tasktype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.tasktypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param TaskType $tasktype
     * @throws GeneralException
     * @return bool
     */
    public function delete(TaskType $tasktype)
    {
        if ($tasktype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.tasktypes.delete_error'));
    }
}

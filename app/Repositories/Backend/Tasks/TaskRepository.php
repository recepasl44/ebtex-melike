<?php

namespace App\Repositories\Backend\Tasks;

use DB;
use Carbon\Carbon;
use App\Models\Tasks\Task;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskRepository.
 */
class TaskRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Task::class;

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
                config('module.tasks.table').'.id',
                config('module.tasks.table').'.name',
				config('module.tasks.table').'.user_by',
				config('module.tasks.table').'.user_at',
				config('module.tasks.table').'.task_to',
				
                config('module.tasks.table').'.created_at',
                config('module.tasks.table').'.updated_at',
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
        if (Task::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.tasks.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Task $task
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Task $task, array $input)
    {
    	if ($task->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.tasks.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Task $task
     * @throws GeneralException
     * @return bool
     */
    public function delete(Task $task)
    {
        if ($task->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.tasks.delete_error'));
    }
}

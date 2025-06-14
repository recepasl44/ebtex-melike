<?php

namespace App\Repositories\Backend\EventStudents;

use DB;
use Carbon\Carbon;
use App\Models\EventStudents\EventStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EventStudentRepository.
 */
class EventStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = EventStudent::class;

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
                config('module.eventstudents.table').'.id',
                config('module.eventstudents.table').'.event_id',
				config('module.eventstudents.table').'.student_id',
				config('module.eventstudents.table').'.status',
				
                config('module.eventstudents.table').'.created_at',
                config('module.eventstudents.table').'.updated_at',
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
        if (EventStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.eventstudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param EventStudent $eventstudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(EventStudent $eventstudent, array $input)
    {
    	if ($eventstudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.eventstudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param EventStudent $eventstudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(EventStudent $eventstudent)
    {
        if ($eventstudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.eventstudents.delete_error'));
    }
}

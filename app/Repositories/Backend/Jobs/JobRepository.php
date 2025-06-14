<?php

namespace App\Repositories\Backend\Jobs;

use DB;
use Carbon\Carbon;
use App\Models\Jobs\Job;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class JobRepository.
 */
class JobRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Job::class;

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
                config('module.jobs.table').'.id',
                config('module.jobs.table').'.name',
				config('module.jobs.table').'.status',
				
                config('module.jobs.table').'.created_at',
                config('module.jobs.table').'.updated_at',
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
        if (Job::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.jobs.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Job $job
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Job $job, array $input)
    {
    	if ($job->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.jobs.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Job $job
     * @throws GeneralException
     * @return bool
     */
    public function delete(Job $job)
    {
        if ($job->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.jobs.delete_error'));
    }
}

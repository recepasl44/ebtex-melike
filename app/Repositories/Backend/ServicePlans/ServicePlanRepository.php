<?php

namespace App\Repositories\Backend\ServicePlans;

use DB;
use Carbon\Carbon;
use App\Models\ServicePlans\ServicePlan;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServicePlanRepository.
 */
class ServicePlanRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ServicePlan::class;

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
                config('module.serviceplans.table').'.id',
                config('module.serviceplans.table').'.vehicle_id',
				config('module.serviceplans.table').'.driver_id',
				config('module.serviceplans.table').'.session_id',
				config('module.serviceplans.table').'.route_id',
				config('module.serviceplans.table').'.start_date',
				config('module.serviceplans.table').'.end_date',
				config('module.serviceplans.table').'.passengers',
				config('module.serviceplans.table').'.status',
				
                config('module.serviceplans.table').'.created_at',
                config('module.serviceplans.table').'.updated_at',
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
        if (ServicePlan::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.serviceplans.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ServicePlan $serviceplan
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ServicePlan $serviceplan, array $input)
    {
    	if ($serviceplan->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.serviceplans.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ServicePlan $serviceplan
     * @throws GeneralException
     * @return bool
     */
    public function delete(ServicePlan $serviceplan)
    {
        if ($serviceplan->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.serviceplans.delete_error'));
    }
}

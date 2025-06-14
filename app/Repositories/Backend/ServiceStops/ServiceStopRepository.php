<?php

namespace App\Repositories\Backend\ServiceStops;

use DB;
use Carbon\Carbon;
use App\Models\ServiceStops\ServiceStop;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceStopRepository.
 */
class ServiceStopRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ServiceStop::class;

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
                config('module.servicestops.table').'.id',
                config('module.servicestops.table').'.route_id',
				config('module.servicestops.table').'.name',
				config('module.servicestops.table').'.lat',
				config('module.servicestops.table').'.long',
				
                config('module.servicestops.table').'.created_at',
                config('module.servicestops.table').'.updated_at',
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
        if (ServiceStop::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.servicestops.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ServiceStop $servicestop
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ServiceStop $servicestop, array $input)
    {
    	if ($servicestop->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.servicestops.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ServiceStop $servicestop
     * @throws GeneralException
     * @return bool
     */
    public function delete(ServiceStop $servicestop)
    {
        if ($servicestop->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.servicestops.delete_error'));
    }
}

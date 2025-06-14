<?php

namespace App\Repositories\Backend\ServiceTypes;

use DB;
use Carbon\Carbon;
use App\Models\ServiceTypes\ServiceType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceTypeRepository.
 */
class ServiceTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ServiceType::class;

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
                config('module.servicetypes.table').'.id',
                config('module.servicetypes.table').'.name',
				
                config('module.servicetypes.table').'.created_at',
                config('module.servicetypes.table').'.updated_at',
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
        if (ServiceType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.servicetypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ServiceType $servicetype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ServiceType $servicetype, array $input)
    {
    	if ($servicetype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.servicetypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ServiceType $servicetype
     * @throws GeneralException
     * @return bool
     */
    public function delete(ServiceType $servicetype)
    {
        if ($servicetype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.servicetypes.delete_error'));
    }
}

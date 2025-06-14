<?php

namespace App\Repositories\Backend\Vehicles;

use DB;
use Carbon\Carbon;
use App\Models\Vehicles\Vehicle;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class VehicleRepository.
 */
class VehicleRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Vehicle::class;

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
                config('module.vehicles.table').'.id',
                config('module.vehicles.table').'.plate_no',
				config('module.vehicles.table').'.model_id',
				config('module.vehicles.table').'.model_year',
				config('module.vehicles.table').'.owner',
				config('module.vehicles.table').'.driver_id',
				config('module.vehicles.table').'.vin',
				config('module.vehicles.table').'.check_date',
				config('module.vehicles.table').'.insurance_date',
				config('module.vehicles.table').'.mtv_date',
				config('module.vehicles.table').'.capacity',
				config('module.vehicles.table').'.status',
				config('module.vehicles.table').'.lat',
				config('module.vehicles.table').'.long',

                config('module.vehicles.table').'.created_at',
                config('module.vehicles.table').'.updated_at',
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
        if (Vehicle::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.vehicles.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Vehicle $vehicle
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Vehicle $vehicle, array $input)
    {
    	if ($vehicle->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.vehicles.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Vehicle $vehicle
     * @throws GeneralException
     * @return bool
     */
    public function delete(Vehicle $vehicle)
    {
        if ($vehicle->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.vehicles.delete_error'));
    }
}

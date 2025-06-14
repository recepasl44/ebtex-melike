<?php

namespace App\Repositories\Backend\Routes;

use DB;
use Carbon\Carbon;
use App\Models\Routes\Route;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class RouteRepository.
 */
class RouteRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Route::class;

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
                config('module.routes.table').'.id',
                config('module.routes.table').'.vehicle_id',
				config('module.routes.table').'.name',
				
                config('module.routes.table').'.created_at',
                config('module.routes.table').'.updated_at',
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
        if (Route::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.routes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Route $route
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Route $route, array $input)
    {
    	if ($route->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.routes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Route $route
     * @throws GeneralException
     * @return bool
     */
    public function delete(Route $route)
    {
        if ($route->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.routes.delete_error'));
    }
}

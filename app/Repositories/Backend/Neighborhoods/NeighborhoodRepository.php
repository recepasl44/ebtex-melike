<?php

namespace App\Repositories\Backend\Neighborhoods;

use DB;
use Carbon\Carbon;
use App\Models\Neighborhoods\Neighborhood;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NeighborhoodRepository.
 */
class NeighborhoodRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Neighborhood::class;

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
                config('module.neighborhoods.table').'.id',
                config('module.neighborhoods.table').'.district_id',
				config('module.neighborhoods.table').'.name',
				config('module.neighborhoods.table').'.zip_code',
				
                config('module.neighborhoods.table').'.created_at',
                config('module.neighborhoods.table').'.updated_at',
            ]);
        if(request()->has('district_id') && !empty(request()->get('district_id'))){
            $data = $data->where('district_id', request()->get('district_id'));
        }
        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
        }
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
        if (Neighborhood::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.neighborhoods.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Neighborhood $neighborhood
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Neighborhood $neighborhood, array $input)
    {
    	if ($neighborhood->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.neighborhoods.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Neighborhood $neighborhood
     * @throws GeneralException
     * @return bool
     */
    public function delete(Neighborhood $neighborhood)
    {
        if ($neighborhood->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.neighborhoods.delete_error'));
    }
}

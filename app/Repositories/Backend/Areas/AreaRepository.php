<?php

namespace App\Repositories\Backend\Areas;

use DB;
use Carbon\Carbon;
use App\Models\Areas\Area;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AreaRepository.
 */
class AreaRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Area::class;

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
                config('module.areas.table').'.id',
                config('module.areas.table').'.name',
				
                config('module.areas.table').'.created_at',
                config('module.areas.table').'.updated_at',
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
        if (Area::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.areas.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Area $area
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Area $area, array $input)
    {
    	if ($area->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.areas.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Area $area
     * @throws GeneralException
     * @return bool
     */
    public function delete(Area $area)
    {
        if ($area->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.areas.delete_error'));
    }
}

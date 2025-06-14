<?php

namespace App\Repositories\Backend\Units;

use DB;
use Carbon\Carbon;
use App\Models\Units\Unit;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UnitRepository.
 */
class UnitRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Unit::class;

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
                config('module.units.table').'.id',
                config('module.units.table').'.name',
				config('module.units.table').'.cover',
				config('module.units.table').'.lesson_id',
				
                config('module.units.table').'.created_at',
                config('module.units.table').'.updated_at',
            ]);
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
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
        if (Unit::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.units.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Unit $unit
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Unit $unit, array $input)
    {
    	if ($unit->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.units.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Unit $unit
     * @throws GeneralException
     * @return bool
     */
    public function delete(Unit $unit)
    {
        if ($unit->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.units.delete_error'));
    }
}

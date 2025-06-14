<?php

namespace App\Repositories\Backend\Counties;

use DB;
use Carbon\Carbon;
use App\Models\Counties\County;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CountyRepository.
 */
class CountyRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = County::class;

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
                config('module.counties.table').'.id',
                config('module.counties.table').'.city_id',
				config('module.counties.table').'.name',
				
                config('module.counties.table').'.created_at',
                config('module.counties.table').'.updated_at',
            ]);
        if(request()->has('city_id') && !empty(request()->get('city_id'))){
            $data = $data->where('city_id', request()->get('city_id'));
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
        if (County::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.counties.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param County $county
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(County $county, array $input)
    {
    	if ($county->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.counties.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param County $county
     * @throws GeneralException
     * @return bool
     */
    public function delete(County $county)
    {
        if ($county->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.counties.delete_error'));
    }
}

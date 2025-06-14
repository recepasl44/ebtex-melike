<?php

namespace App\Repositories\Backend\Cities;

use DB;
use App\Supports\Carbon;
use App\Models\Cities\City;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CityRepository.
 */
class CityRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = City::class;

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
                config('module.cities.table').'.id',
                config('module.cities.table').'.country_id',
                config('module.cities.table').'.phone_code',
                config('module.cities.table').'.plate_no',
                config('module.cities.table').'.name',
                config('module.cities.table').'.created_at',
                config('module.cities.table').'.updated_at',
            ]);
        if(request()->has('country_id') && !empty(request()->get('country_id'))){
            $data = $data->where('country_id', request()->get('country_id'));
        }
        if(request()->has('phone_code') && !empty(request()->get('phone_code'))){
            $data = $data->where('phone_code', request()->get('phone_code'));
        }
        if(request()->has('plate_no') && !empty(request()->get('plate_no'))){
            $data = $data->where('plate_no', request()->get('plate_no'));
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
        if (City::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.cities.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param City $city
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(City $city, array $input)
    {
    	if ($city->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.cities.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param City $city
     * @throws GeneralException
     * @return bool
     */
    public function delete(City $city)
    {
        if ($city->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.cities.delete_error'));
    }
}

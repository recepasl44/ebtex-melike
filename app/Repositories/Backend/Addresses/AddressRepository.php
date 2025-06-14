<?php

namespace App\Repositories\Backend\Addresses;

use DB;
use Carbon\Carbon;
use App\Models\Addresses\Address;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AddressRepository.
 */
class AddressRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Address::class;

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
                config('module.addresses.table').'.id',
                config('module.addresses.table').'.addressable_id',
				config('module.addresses.table').'.addressable_type',
				config('module.addresses.table').'.country_id',
				config('module.addresses.table').'.city_id',
				config('module.addresses.table').'.county_id',
				config('module.addresses.table').'.district_id',
				config('module.addresses.table').'.neighborhood_id',
				config('module.addresses.table').'.address',
				
                config('module.addresses.table').'.created_at',
                config('module.addresses.table').'.updated_at',
            ]);
        if(request()->has('country_id') && !empty(request()->get('country_idt_type_id'))){
            $data = $data->where('country_id', request()->get('country_id'));
        }
        if(request()->has('city_id') && !empty(request()->get('city_id'))){
            $data = $data->where('city_id', request()->get('city_id'));
        }
        if(request()->has('county_id') && !empty(request()->get('county_id'))){
            $data = $data->where('county_id', request()->get('county_id'));
        }
        if(request()->has('district_id') && !empty(request()->get('district_id'))){
            $data = $data->where('district_id', request()->get('district_id'));
        }
        if(request()->has('neighborhood_id') && !empty(request()->get('neighborhood_id'))){
            $data = $data->where('neighborhood_id', request()->get('neighborhood_id'));
        }
        if(request()->has('address') && !empty(request()->get('address'))){
            $data = $data->where('address', 'like', '%'.request()->get('address').'%');
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
        if ($address = Address::create($input)) {
            return $address->id;
        }
        throw new GeneralException(trans('exceptions.backend.addresses.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Address $address
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Address $address, array $input)
    {
    	if ($address->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.addresses.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Address $address
     * @throws GeneralException
     * @return bool
     */
    public function delete(Address $address)
    {
        if ($address->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.addresses.delete_error'));
    }
}

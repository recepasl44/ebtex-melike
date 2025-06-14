<?php

namespace App\Repositories\Backend\Schools;

use DB;
use Carbon\Carbon;
use App\Models\Schools\School;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SchoolRepository.
 */
class SchoolRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = School::class;

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
                config('module.schools.table').'.id',
                config('module.schools.table').'.name',
				config('module.schools.table').'.country_id',
				config('module.schools.table').'.city_id',
				config('module.schools.table').'.county_id',
				config('module.schools.table').'.code',
				config('module.schools.table').'.website',
				config('module.schools.table').'.address',
				config('module.schools.table').'.phone',
				config('module.schools.table').'.email',
				config('module.schools.table').'.fax',
				config('module.schools.table').'.additional_information',
				config('module.schools.table').'.type_id',
				
                config('module.schools.table').'.created_at',
                config('module.schools.table').'.updated_at',
            ]);

        if(request()->has('country_id') && !empty(request()->get('country_id'))){
            $data = $data->where('country_id', request()->get('country_id'));
        }
        if(request()->has('city_id') && !empty(request()->get('city_id'))){
            $data = $data->where('city_id', request()->get('city_id'));
        }
        if(request()->has('county_id') && !empty(request()->get('county_id'))){
            $data = $data->where('county_id', request()->get('county_id'));
        }
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
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
        if (School::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.schools.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param School $school
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(School $school, array $input)
    {
    	if ($school->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.schools.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param School $school
     * @throws GeneralException
     * @return bool
     */
    public function delete(School $school)
    {
        if ($school->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.schools.delete_error'));
    }
}

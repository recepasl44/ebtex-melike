<?php

namespace App\Repositories\Backend\Scholarships;

use DB;
use Carbon\Carbon;
use App\Models\Scholarships\Scholarship;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScholarshipRepository.
 */
class ScholarshipRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Scholarship::class;

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
                config('module.scholarships.table').'.id',
                config('module.scholarships.table').'.short_name',
				config('module.scholarships.table').'.name',
				config('module.scholarships.table').'.branche_id',
				config('module.scholarships.table').'.season_id',
				config('module.scholarships.table').'.duration',
				config('module.scholarships.table').'.created_by',
				config('module.scholarships.table').'.status',
				
                config('module.scholarships.table').'.created_at',
                config('module.scholarships.table').'.updated_at',
            ]);

        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }

        if(request()->has('season_id') && !empty(request()->get('season_id'))){
            $data = $data->where('season_id', request()->get('season_id'));
        }

        if(request()->has('created_by') && !empty(request()->get('created_by'))){
            $data = $data->where('created_by', request()->get('created_by'));
        }

        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
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
        if (Scholarship::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scholarships.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Scholarship $scholarship
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Scholarship $scholarship, array $input)
    {
    	if ($scholarship->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scholarships.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Scholarship $scholarship
     * @throws GeneralException
     * @return bool
     */
    public function delete(Scholarship $scholarship)
    {
        if ($scholarship->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scholarships.delete_error'));
    }
}

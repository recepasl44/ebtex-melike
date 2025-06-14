<?php

namespace App\Repositories\Backend\ScolarshipAssigns;

use DB;
use Carbon\Carbon;
use App\Models\ScolarshipAssigns\ScolarshipAssign;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScolarshipAssignRepository.
 */
class ScolarshipAssignRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ScolarshipAssign::class;

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
                config('module.scolarshipassigns.table').'.id',
                config('module.scolarshipassigns.table').'.scholarship_id',
				config('module.scolarshipassigns.table').'.branche_id',
				config('module.scolarshipassigns.table').'.season_id',
				config('module.scolarshipassigns.table').'.classroom_id',
				config('module.scolarshipassigns.table').'.session_id',
				config('module.scolarshipassigns.table').'.level_id',
				config('module.scolarshipassigns.table').'.quota',
				
                config('module.scolarshipassigns.table').'.created_at',
                config('module.scolarshipassigns.table').'.updated_at',
            ]);
        if(request()->has('scholarship_id') && !empty(request()->get('scholarship_id'))){
            $data = $data->where('scholarship_id', request()->get('scholarship_id'));
        }
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('season_id') && !empty(request()->get('season_id'))){
            $data = $data->where('season_id', request()->get('season_id'));
        }
        if(request()->has('classroom_id') && !empty(request()->get('classroom_id'))){
            $data = $data->where('classroom_id', request()->get('classroom_id'));
        }
        if(request()->has('session_id') && !empty(request()->get('session_id'))){
            $data = $data->where('session_id', request()->get('session_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
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
        if (ScolarshipAssign::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scolarshipassigns.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ScolarshipAssign $scolarshipassign
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ScolarshipAssign $scolarshipassign, array $input)
    {
    	if ($scolarshipassign->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scolarshipassigns.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ScolarshipAssign $scolarshipassign
     * @throws GeneralException
     * @return bool
     */
    public function delete(ScolarshipAssign $scolarshipassign)
    {
        if ($scolarshipassign->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scolarshipassigns.delete_error'));
    }
}

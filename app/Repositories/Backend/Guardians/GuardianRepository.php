<?php

namespace App\Repositories\Backend\Guardians;

use DB;
use Carbon\Carbon;
use App\Models\Guardians\Guardian;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GuardianRepository.
 */
class GuardianRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Guardian::class;

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
                config('module.guardians.table').'.id',
                config('module.guardians.table').'.is_alive',
				config('module.guardians.table').'.is_parent',
				config('module.guardians.table').'.is_divorced',
				config('module.guardians.table').'.identification_no',
				config('module.guardians.table').'.full_name',
				config('module.guardians.table').'.phone',
				config('module.guardians.table').'.profession',
				config('module.guardians.table').'.home_phone',
				config('module.guardians.table').'.work_phone',
				config('module.guardians.table').'.address',
				config('module.guardians.table').'.work_address',
				config('module.guardians.table').'.birthday',
				config('module.guardians.table').'.birthplace',
				config('module.guardians.table').'.workplace',
				config('module.guardians.table').'.email',
				config('module.guardians.table').'.wedding_anniversary',
				config('module.guardians.table').'.student_id',
				config('module.guardians.table').'.kinship_id',
				config('module.guardians.table').'.kinship',
				config('module.guardians.table').'.health',
                config('module.guardians.table').'.education',

                config('module.guardians.table').'.created_at',
                config('module.guardians.table').'.updated_at',
            ]);

        if(request()->has('is_alive') && !empty(request()->get('is_alive'))){
            $data = $data->where('is_alive', request()->get('is_alive'));
        }
        if(request()->has('is_parentship_id') && !empty(request()->get('is_parent'))){
            $data = $data->where('is_parent', request()->get('is_parent'));
        }
        if(request()->has('is_divorcedship_id') && !empty(request()->get('is_divorced'))){
            $data = $data->where('is_divorced', request()->get('is_divorced'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('kinship_id') && !empty(request()->get('kinship_id'))){
            $data = $data->where('kinship_id', request()->get('kinship_id'));
        }
        if(request()->has('full_name') && !empty(request()->get('full_name'))){
            $data = $data->where('full_name', 'like', '%'.request()->get('full_name').'%');
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
        if (Guardian::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.guardians.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Guardian $guardian
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Guardian $guardian, array $input)
    {
    	if ($guardian->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.guardians.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Guardian $guardian
     * @throws GeneralException
     * @return bool
     */
    public function delete(Guardian $guardian)
    {
        if ($guardian->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.guardians.delete_error'));
    }
}

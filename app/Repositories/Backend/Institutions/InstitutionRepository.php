<?php

namespace App\Repositories\Backend\Institutions;

use DB;
use Carbon\Carbon;
use App\Models\Institutions\Institution;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstitutionRepository.
 */
class InstitutionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Institution::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.institutions.table').'.id',
                config('module.institutions.table').'.type_id',
				config('module.institutions.table').'.name',
				
                config('module.institutions.table').'.created_at',
                config('module.institutions.table').'.updated_at',
            ]);
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
        if (Institution::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.institutions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Institution $institution
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Institution $institution, array $input)
    {
    	if ($institution->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.institutions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Institution $institution
     * @throws GeneralException
     * @return bool
     */
    public function delete(Institution $institution)
    {
        if ($institution->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.institutions.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\SchoolTypes;

use DB;
use Carbon\Carbon;
use App\Models\SchoolTypes\SchoolType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SchoolTypeRepository.
 */
class SchoolTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SchoolType::class;

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
                config('module.schooltypes.table').'.id',
                config('module.schooltypes.table').'.name',
				
                config('module.schooltypes.table').'.created_at',
                config('module.schooltypes.table').'.updated_at',
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
        if (SchoolType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.schooltypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SchoolType $schooltype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SchoolType $schooltype, array $input)
    {
    	if ($schooltype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.schooltypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SchoolType $schooltype
     * @throws GeneralException
     * @return bool
     */
    public function delete(SchoolType $schooltype)
    {
        if ($schooltype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.schooltypes.delete_error'));
    }
}

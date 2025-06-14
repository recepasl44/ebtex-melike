<?php

namespace App\Repositories\Backend\EducationStatuses;

use DB;
use Carbon\Carbon;
use App\Models\EducationStatuses\EducationStatus;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EducationStatusRepository.
 */
class EducationStatusRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = EducationStatus::class;

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
                config('module.educationstatuses.table').'.id',
                config('module.educationstatuses.table').'.name',
				config('module.educationstatuses.table').'.status',
				
                config('module.educationstatuses.table').'.created_at',
                config('module.educationstatuses.table').'.updated_at',
            ]);
            
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
        if (EducationStatus::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.educationstatuses.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param EducationStatus $educationstatus
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(EducationStatus $educationstatus, array $input)
    {
    	if ($educationstatus->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.educationstatuses.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param EducationStatus $educationstatus
     * @throws GeneralException
     * @return bool
     */
    public function delete(EducationStatus $educationstatus)
    {
        if ($educationstatus->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.educationstatuses.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\InstitutionTypes;

use DB;
use Carbon\Carbon;
use App\Models\InstitutionTypes\InstitutionType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstitutionTypeRepository.
 */
class InstitutionTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = InstitutionType::class;

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
                config('module.institutiontypes.table').'.id',
                config('module.institutiontypes.table').'.name',
				
                config('module.institutiontypes.table').'.created_at',
                config('module.institutiontypes.table').'.updated_at',
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
        if (InstitutionType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.institutiontypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param InstitutionType $institutiontype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(InstitutionType $institutiontype, array $input)
    {
    	if ($institutiontype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.institutiontypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param InstitutionType $institutiontype
     * @throws GeneralException
     * @return bool
     */
    public function delete(InstitutionType $institutiontype)
    {
        if ($institutiontype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.institutiontypes.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\SourceTypes;

use DB;
use Carbon\Carbon;
use App\Models\SourceTypes\SourceType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SourceTypeRepository.
 */
class SourceTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SourceType::class;

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
                config('module.sourcetypes.table').'.id',
                config('module.sourcetypes.table').'.name',
				
                config('module.sourcetypes.table').'.created_at',
                config('module.sourcetypes.table').'.updated_at',
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
        if (SourceType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.sourcetypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SourceType $sourcetype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SourceType $sourcetype, array $input)
    {
    	if ($sourcetype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.sourcetypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SourceType $sourcetype
     * @throws GeneralException
     * @return bool
     */
    public function delete(SourceType $sourcetype)
    {
        if ($sourcetype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.sourcetypes.delete_error'));
    }
}

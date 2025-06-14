<?php

namespace App\Repositories\Backend\GroupTypes;

use DB;
use Carbon\Carbon;
use App\Models\GroupTypes\GroupType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GroupTypeRepository.
 */
class GroupTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = GroupType::class;

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
                config('module.grouptypes.table').'.id',
                config('module.grouptypes.table').'.name',
				
                config('module.grouptypes.table').'.created_at',
                config('module.grouptypes.table').'.updated_at',
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
        if (GroupType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.grouptypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param GroupType $grouptype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(GroupType $grouptype, array $input)
    {
    	if ($grouptype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.grouptypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param GroupType $grouptype
     * @throws GeneralException
     * @return bool
     */
    public function delete(GroupType $grouptype)
    {
        if ($grouptype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.grouptypes.delete_error'));
    }
}

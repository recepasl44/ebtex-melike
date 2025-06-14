<?php

namespace App\Repositories\Backend\Groups;

use DB;
use Carbon\Carbon;
use App\Models\Groups\Group;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GroupRepository.
 */
class GroupRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Group::class;

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
                config('module.groups.table').'.id',
                config('module.groups.table').'.name',
				
                config('module.groups.table').'.created_at',
                config('module.groups.table').'.updated_at',
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
        if (Group::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.groups.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Group $group
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Group $group, array $input)
    {
    	if ($group->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.groups.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Group $group
     * @throws GeneralException
     * @return bool
     */
    public function delete(Group $group)
    {
        if ($group->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.groups.delete_error'));
    }
}

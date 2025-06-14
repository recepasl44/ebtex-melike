<?php

namespace App\Repositories\Backend\Members;

use DB;
use App\Supports\Carbon;
use App\Models\Members\Member;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MemberRepository.
 */
class MemberRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Member::class;

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
                config('module.members.table').'.id',
                config('module.members.table').'.lang',
                config('module.members.table').'.name',
                config('module.members.table').'.title',
                config('module.members.table').'.cover',
                config('module.members.table').'.facebook',
                config('module.members.table').'.twitter',
                config('module.members.table').'.instagram',
                config('module.members.table').'.linkedin',
                config('module.members.table').'.status',
                config('module.members.table').'.created_at',
                config('module.members.table').'.updated_at',
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
        if (Member::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.members.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Member $member
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Member $member, array $input)
    {
    	if ($member->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.members.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Member $member
     * @throws GeneralException
     * @return bool
     */
    public function delete(Member $member)
    {
        if ($member->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.members.delete_error'));
    }
}

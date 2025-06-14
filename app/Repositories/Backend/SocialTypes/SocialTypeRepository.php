<?php

namespace App\Repositories\Backend\SocialTypes;

use DB;
use Carbon\Carbon;
use App\Models\SocialTypes\SocialType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SocialTypeRepository.
 */
class SocialTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SocialType::class;

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
                config('module.socialtypes.table').'.id',
                config('module.socialtypes.table').'.name',
				
                config('module.socialtypes.table').'.created_at',
                config('module.socialtypes.table').'.updated_at',
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
        if (SocialType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.socialtypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SocialType $socialtype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SocialType $socialtype, array $input)
    {
    	if ($socialtype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.socialtypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SocialType $socialtype
     * @throws GeneralException
     * @return bool
     */
    public function delete(SocialType $socialtype)
    {
        if ($socialtype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.socialtypes.delete_error'));
    }
}

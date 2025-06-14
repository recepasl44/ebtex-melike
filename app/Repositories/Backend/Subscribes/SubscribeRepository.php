<?php

namespace App\Repositories\Backend\Subscribes;

use DB;
use App\Supports\Carbon;
use App\Models\Subscribes\Subscribe;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SubscribeRepository.
 */
class SubscribeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Subscribe::class;

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
                config('module.subscribes.table').'.id',
                config('module.subscribes.table').'.name',
                config('module.subscribes.table').'.email',
                config('module.subscribes.table').'.phone',
                config('module.subscribes.table').'.created_at',
                config('module.subscribes.table').'.updated_at',
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
        if (Subscribe::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.subscribes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Subscribe $subscribe
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Subscribe $subscribe, array $input)
    {
    	if ($subscribe->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.subscribes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Subscribe $subscribe
     * @throws GeneralException
     * @return bool
     */
    public function delete(Subscribe $subscribe)
    {
        if ($subscribe->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.subscribes.delete_error'));
    }
}

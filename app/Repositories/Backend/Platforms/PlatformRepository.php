<?php

namespace App\Repositories\Backend\Platforms;

use DB;
use Carbon\Carbon;
use App\Models\Platforms\Platform;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PlatformRepository.
 */
class PlatformRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Platform::class;

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
                config('module.platforms.table').'.id',
                config('module.platforms.table').'.name',
				config('module.platforms.table').'.owner_name',
				config('module.platforms.table').'.phone',
				config('module.platforms.table').'.gsm',
				config('module.platforms.table').'.status',
				
                config('module.platforms.table').'.created_at',
                config('module.platforms.table').'.updated_at',
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
        if (Platform::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.platforms.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Platform $platform
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Platform $platform, array $input)
    {
    	if ($platform->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.platforms.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Platform $platform
     * @throws GeneralException
     * @return bool
     */
    public function delete(Platform $platform)
    {
        if ($platform->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.platforms.delete_error'));
    }
}

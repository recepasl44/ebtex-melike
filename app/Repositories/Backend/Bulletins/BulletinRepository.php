<?php

namespace App\Repositories\Backend\Bulletins;

use DB;
use Carbon\Carbon;
use App\Models\Bulletins\Bulletin;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BulletinRepository.
 */
class BulletinRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Bulletin::class;

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
                config('module.bulletins.table').'.id',
                config('module.bulletins.table').'.title',
				config('module.bulletins.table').'.content',
				config('module.bulletins.table').'.category_id',
				config('module.bulletins.table').'.start_date',
				config('module.bulletins.table').'.end_date',
				config('module.bulletins.table').'.created_by',
				config('module.bulletins.table').'.status',
				config('module.bulletins.table').'.group_id',
				
                config('module.bulletins.table').'.created_at',
                config('module.bulletins.table').'.updated_at',
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
        if (Bulletin::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.bulletins.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Bulletin $bulletin
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Bulletin $bulletin, array $input)
    {
    	if ($bulletin->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.bulletins.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Bulletin $bulletin
     * @throws GeneralException
     * @return bool
     */
    public function delete(Bulletin $bulletin)
    {
        if ($bulletin->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.bulletins.delete_error'));
    }
}

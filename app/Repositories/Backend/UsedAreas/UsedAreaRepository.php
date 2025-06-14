<?php

namespace App\Repositories\Backend\UsedAreas;

use DB;
use Carbon\Carbon;
use App\Models\UsedAreas\UsedArea;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UsedAreaRepository.
 */
class UsedAreaRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = UsedArea::class;

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
                config('module.usedareas.table').'.id',
                config('module.usedareas.table').'.name',
                config('module.usedareas.table').'.group_type_id',

                config('module.usedareas.table').'.created_at',
                config('module.usedareas.table').'.updated_at',
            ]);
        if(request()->has('group_type_id') && !empty(request()->get('group_type_id'))){
            $data = $data->where('group_type_id', request()->get('group_type_id'));
        }
            
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
        if (UsedArea::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.usedareas.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param UsedArea $usedarea
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(UsedArea $usedarea, array $input)
    {
    	if ($usedarea->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.usedareas.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param UsedArea $usedarea
     * @throws GeneralException
     * @return bool
     */
    public function delete(UsedArea $usedarea)
    {
        if ($usedarea->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.usedareas.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\PointTypes;

use DB;
use Carbon\Carbon;
use App\Models\PointTypes\PointType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PointTypeRepository.
 */
class PointTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = PointType::class;

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
                config('module.pointtypes.table').'.id',
                config('module.pointtypes.table').'.name',
				config('module.pointtypes.table').'.quiz_category_id',
				config('module.pointtypes.table').'.content',
				
                config('module.pointtypes.table').'.created_at',
                config('module.pointtypes.table').'.updated_at',
            ]);
        if(request()->has('quiz_category_id') && !empty(request()->get('quiz_category_id'))){
            $data = $data->where('quiz_category_id', request()->get('quiz_category_id'));
        }
        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
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
        if (PointType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.pointtypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param PointType $pointtype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(PointType $pointtype, array $input)
    {
    	if ($pointtype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.pointtypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param PointType $pointtype
     * @throws GeneralException
     * @return bool
     */
    public function delete(PointType $pointtype)
    {
        if ($pointtype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.pointtypes.delete_error'));
    }
}

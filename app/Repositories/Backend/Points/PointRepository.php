<?php

namespace App\Repositories\Backend\Points;

use DB;
use Carbon\Carbon;
use App\Models\Points\Point;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PointRepository.
 */
class PointRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Point::class;

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
                config('module.points.table').'.id',
                config('module.points.table').'.quiz_id',
				config('module.points.table').'.student_id',
				config('module.points.table').'.point_type_id',
				config('module.points.table').'.points',
				
                config('module.points.table').'.created_at',
                config('module.points.table').'.updated_at',
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
        if (Point::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.points.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Point $point
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Point $point, array $input)
    {
    	if ($point->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.points.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Point $point
     * @throws GeneralException
     * @return bool
     */
    public function delete(Point $point)
    {
        if ($point->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.points.delete_error'));
    }
}

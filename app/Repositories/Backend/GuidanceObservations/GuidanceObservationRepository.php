<?php

namespace App\Repositories\Backend\GuidanceObservations;

use DB;
use Carbon\Carbon;
use App\Models\GuidanceObservations\GuidanceObservation;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GuidanceObservationRepository.
 */
class GuidanceObservationRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = GuidanceObservation::class;

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
                config('module.guidanceobservations.table').'.id',
                config('module.guidanceobservations.table').'.student_id',
				config('module.guidanceobservations.table').'.lesson_id',
				config('module.guidanceobservations.table').'.teacher_id',
				config('module.guidanceobservations.table').'.title',
				config('module.guidanceobservations.table').'.description',
				config('module.guidanceobservations.table').'.status',
				config('module.guidanceobservations.table').'.observation_date',

                config('module.guidanceobservations.table').'.created_at',
                config('module.guidanceobservations.table').'.updated_at',
            ]);

        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
        }
        if(request()->has('teacher_id') && !empty(request()->get('teacher_id'))){
            $data = $data->where('teacher_id', request()->get('teacher_id'));
        }
        if(request()->has('start_date') || request()->has('end_date')){
            if(request()->has('start_date') && !empty(request()->get('start_date'))){
                $data = $data->where('observation_date', '>=', request()->get('start_date'));
            }
            if(request()->has('end_date') && !empty(request()->get('end_date'))){
                $data = $data->where('observation_date', '<=', request()->get('end_date'));
            }
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
        if (GuidanceObservation::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.guidanceobservations.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param GuidanceObservation $guidanceobservation
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(GuidanceObservation $guidanceobservation, array $input)
    {
    	if ($guidanceobservation->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.guidanceobservations.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param GuidanceObservation $guidanceobservation
     * @throws GeneralException
     * @return bool
     */
    public function delete(GuidanceObservation $guidanceobservation)
    {
        if ($guidanceobservation->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.guidanceobservations.delete_error'));
    }
}

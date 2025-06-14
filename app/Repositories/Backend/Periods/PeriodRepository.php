<?php

namespace App\Repositories\Backend\Periods;

use DB;
use Carbon\Carbon;
use App\Models\Periods\Period;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PeriodRepository.
 */
class PeriodRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Period::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data =  $this->query()
            ->select([
                config('module.periods.table').'.id',
                config('module.periods.table').'.name',
                config('module.periods.table').'.student_id',
                config('module.periods.table').'.teacher_id',
                config('module.periods.table').'.start_date',
                config('module.periods.table').'.end_date',
                DB::raw('ROW_NUMBER() OVER (PARTITION BY periods.student_id, periods.teacher_id ORDER BY periods.start_date) AS period_no'),
                config('module.periods.table').'.created_at',
                config('module.periods.table').'.updated_at',
            ]);

        if(request()->has('teacher_id') && !empty(request()->get('teacher_id'))){
            $data = $data->where('teacher_id', request()->get('teacher_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }

        $now = \Carbon\Carbon::now(); // Şu anki tarih

        if(request()->has('start_date') || request()->has('end_date')){
            if(request()->has('start_date') && !empty(request()->get('start_date'))){
                $data = $data->where('start_date', '>=', request()->get('start_date'));
            }
            if(request()->has('end_date') && !empty(request()->get('end_date'))){
                $data = $data->where('end_date', '<=', request()->get('end_date'));
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
        if (Period::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.periods.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Period $period
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Period $period, array $input)
    {
    	if ($period->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.periods.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Period $period
     * @throws GeneralException
     * @return bool
     */
    public function delete(Period $period)
    {
        if ($period->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.periods.delete_error'));
    }
}

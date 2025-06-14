<?php

namespace App\Repositories\Backend\QuizAttendances;

use DB;
use Carbon\Carbon;
use App\Models\QuizAttendances\QuizAttendance;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizAttendanceRepository.
 */
class QuizAttendanceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizAttendance::class;

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
                config('module.quizattendances.table').'.id',
                config('module.quizattendances.table').'.quiz_id',
				config('module.quizattendances.table').'.student_id',
				config('module.quizattendances.table').'.is_attendance',
				
                config('module.quizattendances.table').'.created_at',
                config('module.quizattendances.table').'.updated_at',
            ]);
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('user_id') && !empty(request()->get('user_id'))){
            $data = $data->where('user_id', request()->get('user_id'));
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
        if (QuizAttendance::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizattendances.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizAttendance $quizattendance
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizAttendance $quizattendance, array $input)
    {
    	if ($quizattendance->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizattendances.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizAttendance $quizattendance
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizAttendance $quizattendance)
    {
        if ($quizattendance->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizattendances.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\QuizTimes;

use DB;
use Carbon\Carbon;
use App\Models\QuizTimes\QuizTime;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizTimeRepository.
 */
class QuizTimeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizTime::class;

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
                config('module.quiztimes.table').'.id',
                config('module.quiztimes.table').'.session_id',
				config('module.quiztimes.table').'.session_hour',
				config('module.quiztimes.table').'.session_minute',
				config('module.quiztimes.table').'.session_second',
				
                config('module.quiztimes.table').'.created_at',
                config('module.quiztimes.table').'.updated_at',
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
        if (QuizTime::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quiztimes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizTime $quiztime
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizTime $quiztime, array $input)
    {
    	if ($quiztime->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quiztimes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizTime $quiztime
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizTime $quiztime)
    {
        if ($quiztime->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quiztimes.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\QuizLevels;

use DB;
use Carbon\Carbon;
use App\Models\QuizLevels\QuizLevel;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizLevelRepository.
 */
class QuizLevelRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizLevel::class;

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
                config('module.quizlevels.table').'.id',
                config('module.quizlevels.table').'.level_id',
				config('module.quizlevels.table').'.type_id',
				config('module.quizlevels.table').'.quiz_id',
				config('module.quizlevels.table').'.time_id',

                config('module.quizlevels.table').'.created_at',
                config('module.quizlevels.table').'.updated_at',
            ]);

        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('time_id') && !empty(request()->get('time_id'))){
            $data = $data->where('time_id', request()->get('time_id'));
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
        if (QuizLevel::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizlevels.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizLevel $quizlevel
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizLevel $quizlevel, array $input)
    {
    	if ($quizlevel->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizlevels.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizLevel $quizlevel
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizLevel $quizlevel)
    {
        if ($quizlevel->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizlevels.delete_error'));
    }
}

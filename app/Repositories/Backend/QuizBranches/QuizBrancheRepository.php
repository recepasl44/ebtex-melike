<?php

namespace App\Repositories\Backend\QuizBranches;

use DB;
use Carbon\Carbon;
use App\Models\QuizBranches\QuizBranche;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizBrancheRepository.
 */
class QuizBrancheRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizBranche::class;

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
                config('module.quizbranches.table').'.id',
                config('module.quizbranches.table').'.quiz_id',
                config('module.quizbranches.table').'.student_id',
				config('module.quizbranches.table').'.branche_id',
				config('module.quizbranches.table').'.session_id',
				
                config('module.quizbranches.table').'.created_at',
                config('module.quizbranches.table').'.updated_at',
            ]);
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('session_id') && !empty(request()->get('session_id'))){
            $data = $data->where('session_id', request()->get('session_id'));
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
        if (QuizBranche::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizbranches.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizBranche $quizbtanche
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizBranche $quizbtanche, array $input)
    {
    	if ($quizbtanche->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizbranches.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizBranche $quizbtanche
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizBranche $quizbtanche)
    {
        if ($quizbtanche->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizbranches.delete_error'));
    }
}

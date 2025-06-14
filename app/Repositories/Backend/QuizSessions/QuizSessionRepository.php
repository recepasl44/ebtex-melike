<?php

namespace App\Repositories\Backend\QuizSessions;

use DB;
use Carbon\Carbon;
use App\Models\QuizSessions\QuizSession;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizSessionRepository.
 */
class QuizSessionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizSession::class;

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
                config('module.quizsessions.table').'.id',
                config('module.quizsessions.table').'.type_id',
                config('module.quizsessions.table').'.quiz_id',
				config('module.quizsessions.table').'.branche_id',
				config('module.quizsessions.table').'.session_date',
				
                config('module.quizsessions.table').'.created_at',
                config('module.quizsessions.table').'.updated_at',
            ]);

        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }

        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('session_date') && !empty(request()->get('session_date'))){
            $data = $data->whereDate('session_date', request()->get('session_date'));
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
        if (QuizSession::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizsessions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizSession $quizsession
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizSession $quizsession, array $input)
    {
    	if ($quizsession->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizsessions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizSession $quizsession
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizSession $quizsession)
    {
        if ($quizsession->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizsessions.delete_error'));
    }
}

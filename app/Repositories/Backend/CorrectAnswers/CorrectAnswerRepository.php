<?php

namespace App\Repositories\Backend\CorrectAnswers;

use DB;
use Carbon\Carbon;
use App\Models\CorrectAnswers\CorrectAnswer;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CorrectAnswerRepository.
 */
class CorrectAnswerRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = CorrectAnswer::class;

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
                config('module.correctanswers.table').'.id',
                config('module.correctanswers.table').'.question_id',
				config('module.correctanswers.table').'.quiz_id',
				config('module.correctanswers.table').'.correct_answer',
				
                config('module.correctanswers.table').'.created_at',
                config('module.correctanswers.table').'.updated_at',
            ]);
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('question_id') && !empty(request()->get('question_id'))){
            $data = $data->where('question_id', request()->get('question_id'));
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
        if (CorrectAnswer::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.correctanswers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param CorrectAnswer $correctanswer
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(CorrectAnswer $correctanswer, array $input)
    {
    	if ($correctanswer->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.correctanswers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param CorrectAnswer $correctanswer
     * @throws GeneralException
     * @return bool
     */
    public function delete(CorrectAnswer $correctanswer)
    {
        if ($correctanswer->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.correctanswers.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\Answers;

use DB;
use Carbon\Carbon;
use App\Models\Answers\Answer;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AnswerRepository.
 */
class AnswerRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Answer::class;

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
                config('module.answers.table').'.id',
                config('module.answers.table').'.quiz_id',
				config('module.answers.table').'.question_id',
				config('module.answers.table').'.student_id',
				config('module.answers.table').'.answer',
				
                config('module.answers.table').'.created_at',
                config('module.answers.table').'.updated_at',
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
        if (Answer::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.answers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Answer $answer
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Answer $answer, array $input)
    {
    	if ($answer->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.answers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Answer $answer
     * @throws GeneralException
     * @return bool
     */
    public function delete(Answer $answer)
    {
        if ($answer->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.answers.delete_error'));
    }
}

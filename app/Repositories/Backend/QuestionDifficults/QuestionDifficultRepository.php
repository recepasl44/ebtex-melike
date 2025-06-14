<?php

namespace App\Repositories\Backend\QuestionDifficults;

use DB;
use Carbon\Carbon;
use App\Models\QuestionDifficults\QuestionDifficult;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuestionDifficultRepository.
 */
class QuestionDifficultRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuestionDifficult::class;

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
                config('module.questiondifficults.table').'.id',
                config('module.questiondifficults.table').'.name',
				
                config('module.questiondifficults.table').'.created_at',
                config('module.questiondifficults.table').'.updated_at',
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
        if (QuestionDifficult::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.questiondifficults.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuestionDifficult $questiondifficult
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuestionDifficult $questiondifficult, array $input)
    {
    	if ($questiondifficult->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.questiondifficults.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuestionDifficult $questiondifficult
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuestionDifficult $questiondifficult)
    {
        if ($questiondifficult->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.questiondifficults.delete_error'));
    }
}

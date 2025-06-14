<?php

namespace App\Repositories\Backend\QuestionTypes;

use DB;
use Carbon\Carbon;
use App\Models\QuestionTypes\QuestionType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuestionTypeRepository.
 */
class QuestionTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuestionType::class;

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
                config('module.questiontypes.table').'.id',
                config('module.questiontypes.table').'.name',
				
                config('module.questiontypes.table').'.created_at',
                config('module.questiontypes.table').'.updated_at',
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
        if (QuestionType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.questiontypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuestionType $questiontype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuestionType $questiontype, array $input)
    {
    	if ($questiontype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.questiontypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuestionType $questiontype
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuestionType $questiontype)
    {
        if ($questiontype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.questiontypes.delete_error'));
    }
}

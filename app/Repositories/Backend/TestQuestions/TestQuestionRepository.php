<?php

namespace App\Repositories\Backend\TestQuestions;

use DB;
use Carbon\Carbon;
use App\Models\TestQuestions\TestQuestion;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestQuestionRepository.
 */
class TestQuestionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = TestQuestion::class;

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
                config('module.testquestions.table').'.id',
                config('module.testquestions.table').'.test_id',
				config('module.testquestions.table').'.question_id',
				
                config('module.testquestions.table').'.created_at',
                config('module.testquestions.table').'.updated_at',
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
        if (TestQuestion::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.testquestions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param TestQuestion $testquestion
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(TestQuestion $testquestion, array $input)
    {
    	if ($testquestion->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.testquestions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param TestQuestion $testquestion
     * @throws GeneralException
     * @return bool
     */
    public function delete(TestQuestion $testquestion)
    {
        if ($testquestion->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.testquestions.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\QuestionCurriculums;

use DB;
use Carbon\Carbon;
use App\Models\QuestionCurriculums\QuestionCurriculum;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuestionCurriculumRepository.
 */
class QuestionCurriculumRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuestionCurriculum::class;

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
                config('module.questioncurriculums.table').'.id',
                config('module.questioncurriculums.table').'.question_id',
				config('module.questioncurriculums.table').'.lesson_id',
                config('module.questioncurriculums.table').'.lesson_name',
				config('module.questioncurriculums.table').'.unit_id',
                config('module.questioncurriculums.table').'.unit_name',
				config('module.questioncurriculums.table').'.chapter_id',
                config('module.questioncurriculums.table').'.chapter_name',
				config('module.questioncurriculums.table').'.topic_id',
                config('module.questioncurriculums.table').'.topic_name',
				config('module.questioncurriculums.table').'.achievement_id',
                config('module.questioncurriculums.table').'.achievement_name',
				config('module.questioncurriculums.table').'.status',
                config('module.questioncurriculums.table').'.created_at',
                config('module.questioncurriculums.table').'.updated_at',
            ]);
            
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
        if (QuestionCurriculum::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.questioncurriculums.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuestionCurriculum $questioncurriculum
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuestionCurriculum $questioncurriculum, array $input)
    {
    	if ($questioncurriculum->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.questioncurriculums.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuestionCurriculum $questioncurriculum
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuestionCurriculum $questioncurriculum)
    {
        if ($questioncurriculum->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.questioncurriculums.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\QuizCurriculums;

use DB;
use Carbon\Carbon;
use App\Models\QuizCurriculums\QuizCurriculum;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizCurriculumRepository.
 */
class QuizCurriculumRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizCurriculum::class;

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
                config('module.quizcurriculums.table').'.id',
                config('module.quizcurriculums.table').'.type_id',
                config('module.quizcurriculums.table').'.quiz_id',
				config('module.quizcurriculums.table').'.lesson_id',
				config('module.quizcurriculums.table').'.unit_id',
				config('module.quizcurriculums.table').'.chapter_id',
				config('module.quizcurriculums.table').'.topic_id',
				config('module.quizcurriculums.table').'.achievement_id',
				config('module.quizcurriculums.table').'.status',
				
                config('module.quizcurriculums.table').'.created_at',
                config('module.quizcurriculums.table').'.updated_at',
            ]);
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
        }
        if(request()->has('unit_id') && !empty(request()->get('unit_id'))){
            $data = $data->where('unit_id', request()->get('unit_id'));
        }
        if(request()->has('chapter_id') && !empty(request()->get('chapter_id'))){
            $data = $data->where('chapter_id', request()->get('chapter_id'));
        }
        if(request()->has('topic_id') && !empty(request()->get('topic_id'))){
            $data = $data->where('topic_id', request()->get('topic_id'));
        }
        if(request()->has('achievement_id') && !empty(request()->get('achievement_id'))){
            $data = $data->where('achievement_id', request()->get('achievement_id'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
        }
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
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
        if (QuizCurriculum::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizcurriculums.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizCurriculum $quizcurriculum
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizCurriculum $quizcurriculum, array $input)
    {
    	if ($quizcurriculum->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizcurriculums.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizCurriculum $quizcurriculum
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizCurriculum $quizcurriculum)
    {
        if ($quizcurriculum->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizcurriculums.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\Quizzes;

use DB;
use Carbon\Carbon;
use App\Models\Quizzes\Quiz;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizRepository.
 */
class QuizRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Quiz::class;

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
                config('module.quizzes.table').'.id',
                config('module.quizzes.table').'.is_parent',
                config('module.quizzes.table').'.parent_id',
                config('module.quizzes.table').'.quiz_id',
                config('module.quizzes.table').'.branche_id',
                config('module.quizzes.table').'.quiz_no',
                config('module.quizzes.table').'.short_name',
                config('module.quizzes.table').'.name',
                config('module.quizzes.table').'.quiz_date',
                config('module.quizzes.table').'.quiz_end_date',
                config('module.quizzes.table').'.quiz_type_id',
                config('module.quizzes.table').'.quiz_category_id',
                config('module.quizzes.table').'.point_type_id',
                config('module.quizzes.table').'.optical_form_id',
                config('module.quizzes.table').'.level_id',
                config('module.quizzes.table').'.period_id',
                config('module.quizzes.table').'.wrong_right',
                config('module.quizzes.table').'.topic_achievement',
                config('module.quizzes.table').'.total_questions',
                config('module.quizzes.table').'.is_print',
                config('module.quizzes.table').'.question_type_id',
                config('module.quizzes.table').'.source_type_id',
                config('module.quizzes.table').'.source_id',
                config('module.quizzes.table').'.result_publish_datetime',
                config('module.quizzes.table').'.participants',
                config('module.quizzes.table').'.repeat_reason',
                config('module.quizzes.table').'.status',

                config('module.quizzes.table').'.created_at',
                config('module.quizzes.table').'.updated_at',
            ]);
        if(request()->has('is_parent') && !empty(request()->get('is_parent'))){
            $data = $data->where('is_parent', request()->get('is_parent'));
        }
        if(request()->has('parent_id') && !empty(request()->get('parent_id'))){
            $data = $data->where('parent_id', request()->get('parent_id'));
        }
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('quiz_no') && !empty(request()->get('quiz_no'))){
            $data = $data->where('quiz_no', request()->get('quiz_no'));
        }
        if(request()->has('quiz_type_id') && !empty(request()->get('quiz_type_id'))){
            $data = $data->where('quiz_type_id', request()->get('quiz_type_id'));
        }
        if(request()->has('quiz_category_id') && !empty(request()->get('quiz_category_id'))){
            $data = $data->where('quiz_category_id', request()->get('quiz_category_id'));
        }
        if(request()->has('point_type_id')){
            $data = $data->where('point_type_id', request()->get('point_type_id'));
        }
        if(request()->has('optical_form_id')){
            $data = $data->where('optical_form_id', request()->get('optical_form_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('is_print') && !empty(request()->get('is_print'))){
            $data = $data->where('is_print', request()->get('is_print'));
        }
        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
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
        if (Quiz::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizzes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Quiz $quiz
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Quiz $quiz, array $input)
    {
        if ($quiz->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizzes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Quiz $quiz
     * @throws GeneralException
     * @return bool
     */
    public function delete(Quiz $quiz)
    {
        if ($quiz->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizzes.delete_error'));
    }
}

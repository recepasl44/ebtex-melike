<?php

namespace App\Repositories\Backend\QuizQuestions;

use DB;
use Carbon\Carbon;
use App\Models\QuizQuestions\QuizQuestion;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizQuestionRepository.
 */
class QuizQuestionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizQuestion::class;

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
                config('module.quizquestions.table').'.id',
                config('module.quizquestions.table').'.quiz_id',
				config('module.quizquestions.table').'.question_id',
				config('module.quizquestions.table').'.question_number',

                config('module.quizquestions.table').'.created_at',
                config('module.quizquestions.table').'.updated_at',
            ]);
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('question_id') && !empty(request()->get('question_id'))){
            $data = $data->where('question_id', request()->get('question_id'));
        }
        if(request()->has('question_number') && !empty(request()->get('question_number'))){
            $data = $data->where('question_number', request()->get('question_number'));
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
        if (QuizQuestion::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizquestions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizQuestion $quizquestion
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizQuestion $quizquestion, array $input)
    {
    	if ($quizquestion->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizquestions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizQuestion $quizquestion
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizQuestion $quizquestion)
    {
        if ($quizquestion->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizquestions.delete_error'));
    }
}

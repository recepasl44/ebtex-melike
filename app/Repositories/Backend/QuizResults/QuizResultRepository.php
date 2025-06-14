<?php

namespace App\Repositories\Backend\QuizResults;

use DB;
use Carbon\Carbon;
use App\Models\QuizResults\QuizResult;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizResultRepository.
 */
class QuizResultRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizResult::class;

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
                config('module.quizresults.table').'.id',
                config('module.quizresults.table').'.quiz_id',
				config('module.quizresults.table').'.student_id',
				config('module.quizresults.table').'.lesson_id',
				config('module.quizresults.table').'.unit_id',
				config('module.quizresults.table').'.chapter_id',
				config('module.quizresults.table').'.topic_id',
				config('module.quizresults.table').'.achievement_id',
				config('module.quizresults.table').'.questions',
				config('module.quizresults.table').'.corrects',
				config('module.quizresults.table').'.wrongs',
				config('module.quizresults.table').'.blanks',
				config('module.quizresults.table').'.nets',
				config('module.quizresults.table').'.success_rate',
				
                config('module.quizresults.table').'.created_at',
                config('module.quizresults.table').'.updated_at',
            ]);

        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
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
        if (QuizResult::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizresults.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizResult $quizresult
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizResult $quizresult, array $input)
    {
    	if ($quizresult->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizresults.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizResult $quizresult
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizResult $quizresult)
    {
        if ($quizresult->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizresults.delete_error'));
    }
}

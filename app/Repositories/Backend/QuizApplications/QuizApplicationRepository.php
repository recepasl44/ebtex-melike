<?php

namespace App\Repositories\Backend\QuizApplications;

use DB;
use Carbon\Carbon;
use App\Models\QuizApplications\QuizApplication;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScholarshipApplicationRepository.
 */
class QuizApplicationRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizApplication::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data =  $this->query()
            ->select([
                config('module.quizapplications.table').'.id',
                config('module.quizapplications.table').'.student_id',
				config('module.quizapplications.table').'.quiz_id',
				
                config('module.quizapplications.table').'.created_at',
                config('module.quizapplications.table').'.updated_at',
            ]);
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
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
        if (QuizApplication::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizapplications.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizApplication $quizapplication
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizApplication $quizapplication, array $input)
    {
    	if ($quizapplication->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizapplications.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizApplication $quizapplication
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizApplication $quizapplication)
    {
        if ($quizapplication->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizapplications.delete_error'));
    }
}

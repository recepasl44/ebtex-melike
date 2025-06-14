<?php

namespace App\Repositories\Backend\QuizStudents;

use DB;
use Carbon\Carbon;
use App\Models\QuizStudents\QuizStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizStudentRepository.
 */
class QuizStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizStudent::class;

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
                config('module.quizstudents.table').'.id',
                config('module.quizstudents.table').'.quiz_id',
				config('module.quizstudents.table').'.student_id',
				config('module.quizstudents.table').'.status',
				config('module.quizstudents.table').'.remaining_time',
				config('module.quizstudents.table').'.last_question',
				
                config('module.quizstudents.table').'.created_at',
                config('module.quizstudents.table').'.updated_at',
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
        if (QuizStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizstudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizStudent $quizstudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizStudent $quizstudent, array $input)
    {
    	if ($quizstudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizstudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizStudent $quizstudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizStudent $quizstudent)
    {
        if ($quizstudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizstudents.delete_error'));
    }
}

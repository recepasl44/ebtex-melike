<?php

namespace App\Repositories\Backend\QuizClassrooms;

use DB;
use Carbon\Carbon;
use App\Models\QuizClassrooms\QuizClassroom;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizClassroomRepository.
 */
class QuizClassroomRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizClassroom::class;

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
                config('module.quizclassrooms.table').'.id',
                config('module.quizclassrooms.table').'.type_id',
                config('module.quizclassrooms.table').'.quiz_id',
				config('module.quizclassrooms.table').'.classroom_id',
				config('module.quizclassrooms.table').'.quiz_level_id',
				config('module.quizclassrooms.table').'.name',
				config('module.quizclassrooms.table').'.quota',

                config('module.quizclassrooms.table').'.created_at',
                config('module.quizclassrooms.table').'.updated_at',
            ]);
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('classroom_id') && !empty(request()->get('classroom_id'))){
            $data = $data->where('classroom_id', request()->get('classroom_id'));
        }
        if(request()->has('quiz_id') && !empty(request()->get('quiz_id'))){
            $data = $data->where('quiz_id', request()->get('quiz_id'));
        }
        if(request()->has('quiz_level_id') && !empty(request()->get('quiz_level_id'))){
            $data = $data->where('quiz_level_id', request()->get('quiz_level_id'));
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
        if (QuizClassroom::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizclassrooms.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizClassroom $scholarshipclassroom
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizClassroom $scholarshipclassroom, array $input)
    {
    	if ($scholarshipclassroom->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizclassrooms.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizClassroom $scholarshipclassroom
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizClassroom $scholarshipclassroom)
    {
        if ($scholarshipclassroom->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizclassrooms.delete_error'));
    }
}

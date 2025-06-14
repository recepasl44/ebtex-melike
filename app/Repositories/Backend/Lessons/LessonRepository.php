<?php

namespace App\Repositories\Backend\Lessons;

use DB;
use Carbon\Carbon;
use App\Models\Lessons\Lesson;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LessonRepository.
 */
class LessonRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Lesson::class;

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
                config('module.lessons.table').'.id',
                config('module.lessons.table').'.name',
				config('module.lessons.table').'.cover',
				
                config('module.lessons.table').'.created_at',
                config('module.lessons.table').'.updated_at',
            ]);
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
        if (Lesson::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.lessons.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Lesson $lesson
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Lesson $lesson, array $input)
    {
    	if ($lesson->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.lessons.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Lesson $lesson
     * @throws GeneralException
     * @return bool
     */
    public function delete(Lesson $lesson)
    {
        if ($lesson->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.lessons.delete_error'));
    }
}

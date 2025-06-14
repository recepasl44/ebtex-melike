<?php

namespace App\Repositories\Backend\Courses;

use DB;
use Carbon\Carbon;
use App\Models\Courses\Course;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CourseRepository.
 */
class CourseRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Course::class;

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
                config('module.courses.table').'.id',
                config('module.courses.table').'.level_id',
				config('module.courses.table').'.name',
				
                config('module.courses.table').'.created_at',
                config('module.courses.table').'.updated_at',
            ]);
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
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
        if (Course::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.courses.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Course $course
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Course $course, array $input)
    {
    	if ($course->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.courses.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Course $course
     * @throws GeneralException
     * @return bool
     */
    public function delete(Course $course)
    {
        if ($course->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.courses.delete_error'));
    }
}

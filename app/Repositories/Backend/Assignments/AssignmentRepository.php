<?php

namespace App\Repositories\Backend\Assignments;

use DB;
use Carbon\Carbon;
use App\Models\Assignments\Assignment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AssignmentRepository.
 */
class AssignmentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Assignment::class;

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
                config('module.assignments.table').'.id',
                config('module.assignments.table').'.teacher_id',
				config('module.assignments.table').'.program_id',
				config('module.assignments.table').'.level_id',
				config('module.assignments.table').'.schooltype_id',
				config('module.assignments.table').'.course_id',
				config('module.assignments.table').'.class_id',
				config('module.assignments.table').'.lesson_id',
				config('module.assignments.table').'.unit_id',
				config('module.assignments.table').'.topic_id',
				config('module.assignments.table').'.chapter_id',
				config('module.assignments.table').'.achievement_id',
				config('module.assignments.table').'.title',
				config('module.assignments.table').'.source_id',
				config('module.assignments.table').'.start_date',
				config('module.assignments.table').'.end_date',
				config('module.assignments.table').'.description',
				config('module.assignments.table').'.teacher_file',
				config('module.assignments.table').'.category',
				config('module.assignments.table').'.status',
				config('module.assignments.table').'.teacher_planning_start_date',
				config('module.assignments.table').'.teacher_planning_end_date',
				config('module.assignments.table').'.special_permission',
				
                config('module.assignments.table').'.created_at',
                config('module.assignments.table').'.updated_at',
            ]);
        if(request()->has('teacher_id') && !empty(request()->get('teacher_id'))){
            $data = $data->where('teacher_id', request()->get('teacher_id'));
        }
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('schooltype_id') && !empty(request()->get('schooltype_id'))){
            $data = $data->where('schooltype_id', request()->get('schooltype_id'));
        }
        if(request()->has('course_id') && !empty(request()->get('course_id'))){
            $data = $data->where('course_id', request()->get('course_id'));
        }
        if(request()->has('class_id') && !empty(request()->get('class_id'))){
            $data = $data->where('class_id', request()->get('class_id'));
        }
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
        }
        if(request()->has('unit_id') && !empty(request()->get('unit_id'))){
            $data = $data->where('unit_id', request()->get('unit_id'));
        }
        if(request()->has('topic_id') && !empty(request()->get('topic_id'))){
            $data = $data->where('topic_id', request()->get('topic_id'));
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
        if(request()->has('source_id') && !empty(request()->get('source_id'))){
            $data = $data->where('source_id', request()->get('source_id'));
        }
        if(request()->has('category') && !empty(request()->get('category'))){
            $data = $data->where('category', request()->get('category'));
        }

        $now = \Carbon\Carbon::now(); // Şu anki tarih

        if(request()->has('start_date') || request()->has('end_date')){
            if(request()->has('start_date') && !empty(request()->get('start_date'))){
                $data = $data->where('start_date', '>=', request()->get('start_date'));
            }
            if(request()->has('end_date') && !empty(request()->get('end_date'))){
                $data = $data->where('end_date', '<=', request()->get('end_date'));
            }
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
        if (Assignment::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.assignments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Assignment $assignment
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Assignment $assignment, array $input)
    {
    	if ($assignment->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.assignments.update_error'));
    }

}

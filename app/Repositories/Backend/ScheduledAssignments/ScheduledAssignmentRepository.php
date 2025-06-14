<?php

namespace App\Repositories\Backend\ScheduledAssignments;

use DB;
use Carbon\Carbon;
use App\Models\ScheduledAssignments\ScheduledAssignment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScheduledAssignmentRepository.
 */
class ScheduledAssignmentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ScheduledAssignment::class;

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
                config('module.scheduledassignments.table').'.id',
                config('module.scheduledassignments.table').'.type_id',
                config('module.scheduledassignments.table').'.student_id',
                config('module.scheduledassignments.table').'.teacher_id',
                config('module.scheduledassignments.table').'.period_id',
                config('module.scheduledassignments.table').'.program_id',
				config('module.scheduledassignments.table').'.level_id',
				config('module.scheduledassignments.table').'.lesson_id',
				config('module.scheduledassignments.table').'.unit_id',
				config('module.scheduledassignments.table').'.chapter_id',
				config('module.scheduledassignments.table').'.topic_id',
				config('module.scheduledassignments.table').'.achievement_id',
				config('module.scheduledassignments.table').'.source_id',
				config('module.scheduledassignments.table').'.page_range',
				config('module.scheduledassignments.table').'.number_of_questions',
				config('module.scheduledassignments.table').'.working_time',
				config('module.scheduledassignments.table').'.start_date',
				config('module.scheduledassignments.table').'.end_date',
				config('module.scheduledassignments.table').'.description',
				config('module.scheduledassignments.table').'.status',
				config('module.scheduledassignments.table').'.status_level',

                config('module.scheduledassignments.table').'.created_at',
                config('module.scheduledassignments.table').'.updated_at',
            ]);

        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('teacher_id') && !empty(request()->get('teacher_id'))){
            $data = $data->where('teacher_id', request()->get('teacher_id'));
        }
        if(request()->has('period_id') && !empty(request()->get('period_id'))){
            $data = $data->where('period_id', request()->get('period_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
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
        if(request()->has('achievement_id') && !empty(request()->get('achievement_id'))){
            $data = $data->where('achievement_id', request()->get('achievement_id'));
        }
        if(request()->has('source_id') && !empty(request()->get('source_id'))){
            $data = $data->where('source_id', request()->get('source_id'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
        }
        if(request()->has('status_level') && !empty(request()->get('status_level'))){
            $data = $data->where('status_level', request()->get('status_level'));
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
        if (ScheduledAssignment::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.scheduledassignments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ScheduledAssignment $scheduledassignment
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ScheduledAssignment $scheduledassignment, array $input)
    {
    	if ($scheduledassignment->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.scheduledassignments.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ScheduledAssignment $scheduledassignment
     * @throws GeneralException
     * @return bool
     */
    public function delete(ScheduledAssignment $scheduledassignment)
    {
        if ($scheduledassignment->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.scheduledassignments.delete_error'));
    }
}

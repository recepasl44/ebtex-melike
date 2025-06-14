<?php

namespace App\Repositories\Backend\StudentPsychologicals;

use DB;
use Carbon\Carbon;
use App\Models\StudentPsychologicals\StudentPsychological;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StudentPsychologicalRepository.
 */
class StudentPsychologicalRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = StudentPsychological::class;

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
                config('module.studentpsychologicals.table').'.id',
                config('module.studentpsychologicals.table').'.student_id',
				config('module.studentpsychologicals.table').'.psychological_support',
				config('module.studentpsychologicals.table').'.emotional_reactions',
				config('module.studentpsychologicals.table').'.activity_participation',
				config('module.studentpsychologicals.table').'.communication_skills',
				
                config('module.studentpsychologicals.table').'.created_at',
                config('module.studentpsychologicals.table').'.updated_at',
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
        if (StudentPsychological::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.studentpsychologicals.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param StudentPsychological $studentpsychological
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(StudentPsychological $studentpsychological, array $input)
    {
    	if ($studentpsychological->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.studentpsychologicals.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param StudentPsychological $studentpsychological
     * @throws GeneralException
     * @return bool
     */
    public function delete(StudentPsychological $studentpsychological)
    {
        if ($studentpsychological->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.studentpsychologicals.delete_error'));
    }
}

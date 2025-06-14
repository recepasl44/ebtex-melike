<?php

namespace App\Repositories\Backend\StudentInfos;

use DB;
use Carbon\Carbon;
use App\Models\StudentInfos\StudentInfo;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StudentInfoRepository.
 */
class StudentInfoRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = StudentInfo::class;

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
                config('module.studentinfos.table').'.id',
                config('module.studentinfos.table').'.student_id',
				config('module.studentinfos.table').'.birthplace',
				config('module.studentinfos.table').'.medical_support',
				config('module.studentinfos.table').'.special_conditions',
				config('module.studentinfos.table').'.extracurricular_activities',
				config('module.studentinfos.table').'.hobbies_and_skills',
				config('module.studentinfos.table').'.residential_address',
				config('module.studentinfos.table').'.transportation_status',
				config('module.studentinfos.table').'.emergency_contact_info',
				config('module.studentinfos.table').'.number_of_siblings',
				config('module.studentinfos.table').'.birth_order',
				config('module.studentinfos.table').'.chronic_illness',
				config('module.studentinfos.table').'.household_members',
				config('module.studentinfos.table').'.psychological_status',
				config('module.studentinfos.table').'.academic_performance',
				config('module.studentinfos.table').'.support_educations',
				config('module.studentinfos.table').'.additional_notes',
				
                config('module.studentinfos.table').'.created_at',
                config('module.studentinfos.table').'.updated_at',
            ]);
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
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
        if (StudentInfo::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.studentinfos.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param StudentInfo $studentinfo
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(StudentInfo $studentinfo, array $input)
    {
    	if ($studentinfo->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.studentinfos.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param StudentInfo $studentinfo
     * @throws GeneralException
     * @return bool
     */
    public function delete(StudentInfo $studentinfo)
    {
        if ($studentinfo->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.studentinfos.delete_error'));
    }
}

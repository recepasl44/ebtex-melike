<?php

namespace App\Repositories\Backend\GuardianMeetings;

use DB;
use Carbon\Carbon;
use App\Models\GuardianMeetings\GuardianMeeting;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GuardianMeetingRepository.
 */
class GuardianMeetingRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = GuardianMeeting::class;

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
                config('module.guardianmeetings.table').'.id',
                config('module.guardianmeetings.table').'.student_id',
				config('module.guardianmeetings.table').'.guardian_id',
				config('module.guardianmeetings.table').'.teacher_id',
				config('module.guardianmeetings.table').'.subject',
				config('module.guardianmeetings.table').'.suggestions',
				config('module.guardianmeetings.table').'.guardian_requests',
				config('module.guardianmeetings.table').'.satisfaction_status',
				config('module.guardianmeetings.table').'.meeting_type',
				config('module.guardianmeetings.table').'.meeting_date',
				config('module.guardianmeetings.table').'.notes',
				config('module.guardianmeetings.table').'.status',
				
                config('module.guardianmeetings.table').'.created_at',
                config('module.guardianmeetings.table').'.updated_at',
            ]);

        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('guardian_id') && !empty(request()->get('guardian_id'))){
            $data = $data->where('guardian_id', request()->get('guardian_id'));
        }
        if(request()->has('teacher_id') && !empty(request()->get('teacher_id'))){
            $data = $data->where('teacher_id', request()->get('teacher_id'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
        }

        $now = \Carbon\Carbon::now(); // Şu anki tarih

        if(request()->has('start_date') || request()->has('end_date')){
            if(request()->has('start_date') && !empty(request()->get('start_date'))){
                $data = $data->where('meeting_date', '>=', request()->get('start_date'));
            }
            if(request()->has('end_date') && !empty(request()->get('end_date'))){
                $data = $data->where('meeting_date', '<=', request()->get('end_date'));
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
        if (GuardianMeeting::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.guardianmeetings.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param GuardianMeeting $guardianmeeting
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(GuardianMeeting $guardianmeeting, array $input)
    {
    	if ($guardianmeeting->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.guardianmeetings.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param GuardianMeeting $guardianmeeting
     * @throws GeneralException
     * @return bool
     */
    public function delete(GuardianMeeting $guardianmeeting)
    {
        if ($guardianmeeting->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.guardianmeetings.delete_error'));
    }
}

<?php

namespace App\Repositories\Backend\GuidanceMeetings;

use DB;
use Carbon\Carbon;
use App\Models\GuidanceMeetings\GuidanceMeeting;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GuidanceMeetingRepository.
 */
class GuidanceMeetingRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = GuidanceMeeting::class;

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
                config('module.guidancemeetings.table').'.id',
                config('module.guidancemeetings.table').'.teacher_id',
                config('module.guidancemeetings.table').'.student_id',
				config('module.guidancemeetings.table').'.meeting_topic',
				config('module.guidancemeetings.table').'.guidance_name',
				config('module.guidancemeetings.table').'.meeting_notes',
				config('module.guidancemeetings.table').'.meeting_type',
				config('module.guidancemeetings.table').'.meeting_date',
				config('module.guidancemeetings.table').'.meeting_duration',
				config('module.guidancemeetings.table').'.status',

                config('module.guidancemeetings.table').'.created_at',
                config('module.guidancemeetings.table').'.updated_at',
            ]);

        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
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
        if (GuidanceMeeting::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.guidancemeetings.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param GuidanceMeeting $guidancemeeting
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(GuidanceMeeting $guidancemeeting, array $input)
    {
    	if ($guidancemeeting->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.guidancemeetings.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param GuidanceMeeting $guidancemeeting
     * @throws GeneralException
     * @return bool
     */
    public function delete(GuidanceMeeting $guidancemeeting)
    {
        if ($guidancemeeting->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.guidancemeetings.delete_error'));
    }
}

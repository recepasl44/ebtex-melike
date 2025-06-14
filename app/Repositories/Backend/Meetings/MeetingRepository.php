<?php

namespace App\Repositories\Backend\Meetings;

use DB;
use Carbon\Carbon;
use App\Models\Meetings\Meeting;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MeetingRepository.
 */
class MeetingRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Meeting::class;

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
                config('module.meetings.table').'.id',
                config('module.meetings.table').'.season_id',
				config('module.meetings.table').'.branche_id',
				config('module.meetings.table').'.student_id',
				config('module.meetings.table').'.type_id',
				config('module.meetings.table').'.meeting_date',
				config('module.meetings.table').'.created_by',
				config('module.meetings.table').'.meeting_note',
				config('module.meetings.table').'.meeting_by',
				config('module.meetings.table').'.meeting_date_start',
				config('module.meetings.table').'.meeting_date_end',
				config('module.meetings.table').'.meeting_price',
				config('module.meetings.table').'.status',

                config('module.meetings.table').'.created_at',
                config('module.meetings.table').'.updated_at',
            ]);
        if(request()->has('season_id') && !empty(request()->get('season_id'))){
            $data = $data->where('season_id', request()->get('season_id'));
        }
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('student_id') && !empty(request()->get('student_id'))){
            $data = $data->where('student_id', request()->get('student_id'));
        }
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }

        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
        }

        if (request()->has('meeting_date_start') && !empty(request()->get('meeting_date_start'))) {
            $data = $data->where('meeting_date_start', '>=', request()->get('meeting_date_start'));
        }

        if (request()->has('meeting_date_end') && !empty(request()->get('meeting_date_end'))) {
            $data = $data->where('meeting_date_end', '<=', request()->get('meeting_date_end'));
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
        if(empty($input['created_by'])){
            $input['created_by'] = access()->user()->id;
        }
        if (Meeting::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.meetings.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Meeting $meeting
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Meeting $meeting, array $input)
    {
    	if ($meeting->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.meetings.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Meeting $meeting
     * @throws GeneralException
     * @return bool
     */
    public function delete(Meeting $meeting)
    {
        if ($meeting->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.meetings.delete_error'));
    }
}

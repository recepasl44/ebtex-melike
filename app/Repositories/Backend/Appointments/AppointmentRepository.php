<?php

namespace App\Repositories\Backend\Appointments;

use DB;
use Carbon\Carbon;
use App\Models\Appointments\Appointment;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AppointmentRepository.
 */
class AppointmentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Appointment::class;

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
                config('module.appointments.table').'.id',
                config('module.appointments.table').'.season_id',
				config('module.appointments.table').'.branche_id',
				config('module.appointments.table').'.student_id',
				config('module.appointments.table').'.type_id',
				config('module.appointments.table').'.meeting_date',
				config('module.appointments.table').'.meeting_note',
				config('module.appointments.table').'.created_by',
				config('module.appointments.table').'.meeting_by',
				config('module.appointments.table').'.status',

                config('module.appointments.table').'.created_at',
                config('module.appointments.table').'.updated_at',
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
        if (Appointment::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.appointments.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Appointment $appointment
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Appointment $appointment, array $input)
    {
    	if ($appointment->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.appointments.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Appointment $appointment
     * @throws GeneralException
     * @return bool
     */
    public function delete(Appointment $appointment)
    {
        if ($appointment->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.appointments.delete_error'));
    }
}

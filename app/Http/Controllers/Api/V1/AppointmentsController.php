<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AppointmentResource;
use App\Models\Appointments\Appointment;
use App\Repositories\Backend\Appointments\AppointmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AppointmentsController
 */
class AppointmentsController extends APIController
{
    /**
     * __construct.
     *
     * @var AppointmentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AppointmentRepository $repository;
     */
    public function __construct(AppointmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $appointment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AppointmentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Appointment $appointment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Appointment $appointment)
    {
        return new AppointmentResource($appointment);
    }

    
     /**
      * Creates the Resource for appointment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAppointment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AppointmentResource(Appointment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update appointment.
         *
         * @param Appointment    $appointment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Appointment $appointment)
    {
        $validation = $this->validateAppointment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($appointment, $request->all());

        $appointment = Appointment::findOrfail($appointment->id);

        return new AppointmentResource($appointment);
    }
    
    /**
     * Delete appointment.
     *
     * @param Appointment    $appointment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Appointment $appointment)
    {
        $this->repository->delete($appointment);

        return $this->respond([
            'message' => _tr('alerts.backend.appointment.deleted'),
        ]);
    }
    

    /**
     * validate appointment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAppointment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'season_id' => 'required',
               'branche_id' => 'required',
               'student_id' => 'required',
               'meeting_date' => 'date',
               'meeting_note' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate appointment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

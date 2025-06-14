<?php

namespace App\Http\Controllers\Backend\Appointments;

use App\Models\Appointments\Appointment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Appointments\CreateResponse;
use App\Http\Responses\Backend\Appointments\EditResponse;
use App\Repositories\Backend\Appointments\AppointmentRepository;
use App\Http\Requests\Backend\Appointments\ManageAppointmentRequest;
use App\Http\Requests\Backend\Appointments\CreateAppointmentRequest;
use App\Http\Requests\Backend\Appointments\StoreAppointmentRequest;
use App\Http\Requests\Backend\Appointments\EditAppointmentRequest;
use App\Http\Requests\Backend\Appointments\UpdateAppointmentRequest;
use App\Http\Requests\Backend\Appointments\DeleteAppointmentRequest;

/**
 * AppointmentsController
 */
class AppointmentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AppointmentRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Appointments\ManageAppointmentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAppointmentRequest $request)
    {
        return new ViewResponse('backend.appointments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAppointmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Appointments\CreateResponse
     */
    public function create(CreateAppointmentRequest $request)
    {
        return new CreateResponse('backend.appointments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAppointmentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAppointmentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.appointments.index'), ['flash_success' => _tr('alerts.backend.appointments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Appointments\Appointment  $appointment
     * @param  EditAppointmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Appointments\EditResponse
     */
    public function edit(Appointment $appointment, EditAppointmentRequest $request)
    {
        return new EditResponse($appointment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAppointmentRequestNamespace  $request
     * @param  App\Models\Appointments\Appointment  $appointment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $appointment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.appointments.index'), ['flash_success' => _tr('alerts.backend.appointments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAppointmentRequestNamespace  $request
     * @param  App\Models\Appointments\Appointment  $appointment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Appointment $appointment, DeleteAppointmentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($appointment);
        //returning with successfull message
        return new RedirectResponse(route('admin.appointments.index'), ['flash_success' => _tr('alerts.backend.appointments.deleted')]);
    }
    
}

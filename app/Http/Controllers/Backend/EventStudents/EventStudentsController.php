<?php

namespace App\Http\Controllers\Backend\EventStudents;

use App\Models\EventStudents\EventStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\EventStudents\CreateResponse;
use App\Http\Responses\Backend\EventStudents\EditResponse;
use App\Repositories\Backend\EventStudents\EventStudentRepository;
use App\Http\Requests\Backend\EventStudents\ManageEventStudentRequest;
use App\Http\Requests\Backend\EventStudents\CreateEventStudentRequest;
use App\Http\Requests\Backend\EventStudents\StoreEventStudentRequest;
use App\Http\Requests\Backend\EventStudents\EditEventStudentRequest;
use App\Http\Requests\Backend\EventStudents\UpdateEventStudentRequest;
use App\Http\Requests\Backend\EventStudents\DeleteEventStudentRequest;

/**
 * EventStudentsController
 */
class EventStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventStudentRepository $repository;
     */
    public function __construct(EventStudentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\EventStudents\ManageEventStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEventStudentRequest $request)
    {
        return new ViewResponse('backend.eventstudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEventStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EventStudents\CreateResponse
     */
    public function create(CreateEventStudentRequest $request)
    {
        return new CreateResponse('backend.eventstudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEventStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEventStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.eventstudents.index'), ['flash_success' => _tr('alerts.backend.eventstudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\EventStudents\EventStudent  $eventstudent
     * @param  EditEventStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EventStudents\EditResponse
     */
    public function edit(EventStudent $eventstudent, EditEventStudentRequest $request)
    {
        return new EditResponse($eventstudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEventStudentRequestNamespace  $request
     * @param  App\Models\EventStudents\EventStudent  $eventstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEventStudentRequest $request, EventStudent $eventstudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $eventstudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.eventstudents.index'), ['flash_success' => _tr('alerts.backend.eventstudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEventStudentRequestNamespace  $request
     * @param  App\Models\EventStudents\EventStudent  $eventstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(EventStudent $eventstudent, DeleteEventStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($eventstudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.eventstudents.index'), ['flash_success' => _tr('alerts.backend.eventstudents.deleted')]);
    }
    
}

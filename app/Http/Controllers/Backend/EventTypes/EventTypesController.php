<?php

namespace App\Http\Controllers\Backend\EventTypes;

use App\Models\EventTypes\EventType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\EventTypes\CreateResponse;
use App\Http\Responses\Backend\EventTypes\EditResponse;
use App\Repositories\Backend\EventTypes\EventTypeRepository;
use App\Http\Requests\Backend\EventTypes\ManageEventTypeRequest;
use App\Http\Requests\Backend\EventTypes\CreateEventTypeRequest;
use App\Http\Requests\Backend\EventTypes\StoreEventTypeRequest;
use App\Http\Requests\Backend\EventTypes\EditEventTypeRequest;
use App\Http\Requests\Backend\EventTypes\UpdateEventTypeRequest;
use App\Http\Requests\Backend\EventTypes\DeleteEventTypeRequest;

/**
 * EventTypesController
 */
class EventTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventTypeRepository $repository;
     */
    public function __construct(EventTypeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\EventTypes\ManageEventTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEventTypeRequest $request)
    {
        return new ViewResponse('backend.eventtypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEventTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EventTypes\CreateResponse
     */
    public function create(CreateEventTypeRequest $request)
    {
        return new CreateResponse('backend.eventtypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEventTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEventTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.eventtypes.index'), ['flash_success' => _tr('alerts.backend.eventtypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\EventTypes\EventType  $eventtype
     * @param  EditEventTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EventTypes\EditResponse
     */
    public function edit(EventType $eventtype, EditEventTypeRequest $request)
    {
        return new EditResponse($eventtype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEventTypeRequestNamespace  $request
     * @param  App\Models\EventTypes\EventType  $eventtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEventTypeRequest $request, EventType $eventtype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $eventtype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.eventtypes.index'), ['flash_success' => _tr('alerts.backend.eventtypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEventTypeRequestNamespace  $request
     * @param  App\Models\EventTypes\EventType  $eventtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(EventType $eventtype, DeleteEventTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($eventtype);
        //returning with successfull message
        return new RedirectResponse(route('admin.eventtypes.index'), ['flash_success' => _tr('alerts.backend.eventtypes.deleted')]);
    }
    
}

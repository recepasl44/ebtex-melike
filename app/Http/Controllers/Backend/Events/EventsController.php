<?php

namespace App\Http\Controllers\Backend\Events;

use App\Models\Events\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Events\CreateResponse;
use App\Http\Responses\Backend\Events\EditResponse;
use App\Repositories\Backend\Events\EventRepository;
use App\Http\Requests\Backend\Events\ManageEventRequest;
use App\Http\Requests\Backend\Events\CreateEventRequest;
use App\Http\Requests\Backend\Events\StoreEventRequest;
use App\Http\Requests\Backend\Events\EditEventRequest;
use App\Http\Requests\Backend\Events\UpdateEventRequest;
use App\Http\Requests\Backend\Events\DeleteEventRequest;

/**
 * EventsController
 */
class EventsController extends Controller
{
    /**
     * variable to store the repository object
     * @var EventRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventRepository $repository;
     */
    public function __construct(EventRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Events\ManageEventRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEventRequest $request)
    {
        return new ViewResponse('backend.events.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEventRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Events\CreateResponse
     */
    public function create(CreateEventRequest $request)
    {
        return new CreateResponse('backend.events.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEventRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEventRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.events.index'), ['flash_success' => _tr('alerts.backend.events.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Events\Event  $event
     * @param  EditEventRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Events\EditResponse
     */
    public function edit(Event $event, EditEventRequest $request)
    {
        return new EditResponse($event);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEventRequestNamespace  $request
     * @param  App\Models\Events\Event  $event
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $event, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.events.index'), ['flash_success' => _tr('alerts.backend.events.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEventRequestNamespace  $request
     * @param  App\Models\Events\Event  $event
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Event $event, DeleteEventRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($event);
        //returning with successfull message
        return new RedirectResponse(route('admin.events.index'), ['flash_success' => _tr('alerts.backend.events.deleted')]);
    }
    
}

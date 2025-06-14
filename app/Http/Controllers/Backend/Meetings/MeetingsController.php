<?php

namespace App\Http\Controllers\Backend\Meetings;

use App\Models\Meetings\Meeting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Meetings\CreateResponse;
use App\Http\Responses\Backend\Meetings\EditResponse;
use App\Repositories\Backend\Meetings\MeetingRepository;
use App\Http\Requests\Backend\Meetings\ManageMeetingRequest;
use App\Http\Requests\Backend\Meetings\CreateMeetingRequest;
use App\Http\Requests\Backend\Meetings\StoreMeetingRequest;
use App\Http\Requests\Backend\Meetings\EditMeetingRequest;
use App\Http\Requests\Backend\Meetings\UpdateMeetingRequest;
use App\Http\Requests\Backend\Meetings\DeleteMeetingRequest;

/**
 * MeetingsController
 */
class MeetingsController extends Controller
{
    /**
     * variable to store the repository object
     * @var MeetingRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param MeetingRepository $repository;
     */
    public function __construct(MeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Meetings\ManageMeetingRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageMeetingRequest $request)
    {
        return new ViewResponse('backend.meetings.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Meetings\CreateResponse
     */
    public function create(CreateMeetingRequest $request)
    {
        return new CreateResponse('backend.meetings.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMeetingRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreMeetingRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.meetings.index'), ['flash_success' => _tr('alerts.backend.meetings.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Meetings\Meeting  $meeting
     * @param  EditMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Meetings\EditResponse
     */
    public function edit(Meeting $meeting, EditMeetingRequest $request)
    {
        return new EditResponse($meeting);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateMeetingRequestNamespace  $request
     * @param  App\Models\Meetings\Meeting  $meeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateMeetingRequest $request, Meeting $meeting)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $meeting, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.meetings.index'), ['flash_success' => _tr('alerts.backend.meetings.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteMeetingRequestNamespace  $request
     * @param  App\Models\Meetings\Meeting  $meeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Meeting $meeting, DeleteMeetingRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($meeting);
        //returning with successfull message
        return new RedirectResponse(route('admin.meetings.index'), ['flash_success' => _tr('alerts.backend.meetings.deleted')]);
    }
    
}

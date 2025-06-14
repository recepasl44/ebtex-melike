<?php

namespace App\Http\Controllers\Backend\GuardianMeetings;

use App\Models\GuardianMeetings\GuardianMeeting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\GuardianMeetings\CreateResponse;
use App\Http\Responses\Backend\GuardianMeetings\EditResponse;
use App\Repositories\Backend\GuardianMeetings\GuardianMeetingRepository;
use App\Http\Requests\Backend\GuardianMeetings\ManageGuardianMeetingRequest;
use App\Http\Requests\Backend\GuardianMeetings\CreateGuardianMeetingRequest;
use App\Http\Requests\Backend\GuardianMeetings\StoreGuardianMeetingRequest;
use App\Http\Requests\Backend\GuardianMeetings\EditGuardianMeetingRequest;
use App\Http\Requests\Backend\GuardianMeetings\UpdateGuardianMeetingRequest;
use App\Http\Requests\Backend\GuardianMeetings\DeleteGuardianMeetingRequest;

/**
 * GuardianMeetingsController
 */
class GuardianMeetingsController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuardianMeetingRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuardianMeetingRepository $repository;
     */
    public function __construct(GuardianMeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\GuardianMeetings\ManageGuardianMeetingRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGuardianMeetingRequest $request)
    {
        return new ViewResponse('backend.guardianmeetings.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGuardianMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuardianMeetings\CreateResponse
     */
    public function create(CreateGuardianMeetingRequest $request)
    {
        return new CreateResponse('backend.guardianmeetings.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGuardianMeetingRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGuardianMeetingRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.guardianmeetings.index'), ['flash_success' => _tr('alerts.backend.guardianmeetings.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\GuardianMeetings\GuardianMeeting  $guardianmeeting
     * @param  EditGuardianMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuardianMeetings\EditResponse
     */
    public function edit(GuardianMeeting $guardianmeeting, EditGuardianMeetingRequest $request)
    {
        return new EditResponse($guardianmeeting);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGuardianMeetingRequestNamespace  $request
     * @param  App\Models\GuardianMeetings\GuardianMeeting  $guardianmeeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGuardianMeetingRequest $request, GuardianMeeting $guardianmeeting)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $guardianmeeting, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.guardianmeetings.index'), ['flash_success' => _tr('alerts.backend.guardianmeetings.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGuardianMeetingRequestNamespace  $request
     * @param  App\Models\GuardianMeetings\GuardianMeeting  $guardianmeeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(GuardianMeeting $guardianmeeting, DeleteGuardianMeetingRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($guardianmeeting);
        //returning with successfull message
        return new RedirectResponse(route('admin.guardianmeetings.index'), ['flash_success' => _tr('alerts.backend.guardianmeetings.deleted')]);
    }
    
}

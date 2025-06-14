<?php

namespace App\Http\Controllers\Backend\GuidanceMeetings;

use App\Models\GuidanceMeetings\GuidanceMeeting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\GuidanceMeetings\CreateResponse;
use App\Http\Responses\Backend\GuidanceMeetings\EditResponse;
use App\Repositories\Backend\GuidanceMeetings\GuidanceMeetingRepository;
use App\Http\Requests\Backend\GuidanceMeetings\ManageGuidanceMeetingRequest;
use App\Http\Requests\Backend\GuidanceMeetings\CreateGuidanceMeetingRequest;
use App\Http\Requests\Backend\GuidanceMeetings\StoreGuidanceMeetingRequest;
use App\Http\Requests\Backend\GuidanceMeetings\EditGuidanceMeetingRequest;
use App\Http\Requests\Backend\GuidanceMeetings\UpdateGuidanceMeetingRequest;
use App\Http\Requests\Backend\GuidanceMeetings\DeleteGuidanceMeetingRequest;

/**
 * GuidanceMeetingsController
 */
class GuidanceMeetingsController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceMeetingRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceMeetingRepository $repository;
     */
    public function __construct(GuidanceMeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\GuidanceMeetings\ManageGuidanceMeetingRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGuidanceMeetingRequest $request)
    {
        return new ViewResponse('backend.guidancemeetings.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGuidanceMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuidanceMeetings\CreateResponse
     */
    public function create(CreateGuidanceMeetingRequest $request)
    {
        return new CreateResponse('backend.guidancemeetings.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGuidanceMeetingRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGuidanceMeetingRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.guidancemeetings.index'), ['flash_success' => _tr('alerts.backend.guidancemeetings.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\GuidanceMeetings\GuidanceMeeting  $guidancemeeting
     * @param  EditGuidanceMeetingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuidanceMeetings\EditResponse
     */
    public function edit(GuidanceMeeting $guidancemeeting, EditGuidanceMeetingRequest $request)
    {
        return new EditResponse($guidancemeeting);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGuidanceMeetingRequestNamespace  $request
     * @param  App\Models\GuidanceMeetings\GuidanceMeeting  $guidancemeeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGuidanceMeetingRequest $request, GuidanceMeeting $guidancemeeting)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $guidancemeeting, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.guidancemeetings.index'), ['flash_success' => _tr('alerts.backend.guidancemeetings.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGuidanceMeetingRequestNamespace  $request
     * @param  App\Models\GuidanceMeetings\GuidanceMeeting  $guidancemeeting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(GuidanceMeeting $guidancemeeting, DeleteGuidanceMeetingRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($guidancemeeting);
        //returning with successfull message
        return new RedirectResponse(route('admin.guidancemeetings.index'), ['flash_success' => _tr('alerts.backend.guidancemeetings.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\GuidanceObservations;

use App\Models\GuidanceObservations\GuidanceObservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\GuidanceObservations\CreateResponse;
use App\Http\Responses\Backend\GuidanceObservations\EditResponse;
use App\Repositories\Backend\GuidanceObservations\GuidanceObservationRepository;
use App\Http\Requests\Backend\GuidanceObservations\ManageGuidanceObservationRequest;
use App\Http\Requests\Backend\GuidanceObservations\CreateGuidanceObservationRequest;
use App\Http\Requests\Backend\GuidanceObservations\StoreGuidanceObservationRequest;
use App\Http\Requests\Backend\GuidanceObservations\EditGuidanceObservationRequest;
use App\Http\Requests\Backend\GuidanceObservations\UpdateGuidanceObservationRequest;
use App\Http\Requests\Backend\GuidanceObservations\DeleteGuidanceObservationRequest;

/**
 * GuidanceObservationsController
 */
class GuidanceObservationsController extends Controller
{
    /**
     * variable to store the repository object
     * @var GuidanceObservationRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceObservationRepository $repository;
     */
    public function __construct(GuidanceObservationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\GuidanceObservations\ManageGuidanceObservationRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGuidanceObservationRequest $request)
    {
        return new ViewResponse('backend.guidanceobservations.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGuidanceObservationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuidanceObservations\CreateResponse
     */
    public function create(CreateGuidanceObservationRequest $request)
    {
        return new CreateResponse('backend.guidanceobservations.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGuidanceObservationRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGuidanceObservationRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.guidanceobservations.index'), ['flash_success' => _tr('alerts.backend.guidanceobservations.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\GuidanceObservations\GuidanceObservation  $guidanceobservation
     * @param  EditGuidanceObservationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GuidanceObservations\EditResponse
     */
    public function edit(GuidanceObservation $guidanceobservation, EditGuidanceObservationRequest $request)
    {
        return new EditResponse($guidanceobservation);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGuidanceObservationRequestNamespace  $request
     * @param  App\Models\GuidanceObservations\GuidanceObservation  $guidanceobservation
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGuidanceObservationRequest $request, GuidanceObservation $guidanceobservation)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $guidanceobservation, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.guidanceobservations.index'), ['flash_success' => _tr('alerts.backend.guidanceobservations.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGuidanceObservationRequestNamespace  $request
     * @param  App\Models\GuidanceObservations\GuidanceObservation  $guidanceobservation
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(GuidanceObservation $guidanceobservation, DeleteGuidanceObservationRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($guidanceobservation);
        //returning with successfull message
        return new RedirectResponse(route('admin.guidanceobservations.index'), ['flash_success' => _tr('alerts.backend.guidanceobservations.deleted')]);
    }
    
}

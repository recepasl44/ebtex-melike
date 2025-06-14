<?php

namespace App\Http\Controllers\Backend\EducationStatuses;

use App\Models\EducationStatuses\EducationStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\EducationStatuses\CreateResponse;
use App\Http\Responses\Backend\EducationStatuses\EditResponse;
use App\Repositories\Backend\EducationStatuses\EducationStatusRepository;
use App\Http\Requests\Backend\EducationStatuses\ManageEducationStatusRequest;
use App\Http\Requests\Backend\EducationStatuses\CreateEducationStatusRequest;
use App\Http\Requests\Backend\EducationStatuses\StoreEducationStatusRequest;
use App\Http\Requests\Backend\EducationStatuses\EditEducationStatusRequest;
use App\Http\Requests\Backend\EducationStatuses\UpdateEducationStatusRequest;
use App\Http\Requests\Backend\EducationStatuses\DeleteEducationStatusRequest;

/**
 * EducationStatusesController
 */
class EducationStatusesController extends Controller
{
    /**
     * variable to store the repository object
     * @var EducationStatusRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EducationStatusRepository $repository;
     */
    public function __construct(EducationStatusRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\EducationStatuses\ManageEducationStatusRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageEducationStatusRequest $request)
    {
        return new ViewResponse('backend.educationstatuses.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateEducationStatusRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EducationStatuses\CreateResponse
     */
    public function create(CreateEducationStatusRequest $request)
    {
        return new CreateResponse('backend.educationstatuses.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEducationStatusRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreEducationStatusRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.educationstatuses.index'), ['flash_success' => _tr('alerts.backend.educationstatuses.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\EducationStatuses\EducationStatus  $educationstatus
     * @param  EditEducationStatusRequestNamespace  $request
     * @return \App\Http\Responses\Backend\EducationStatuses\EditResponse
     */
    public function edit(EducationStatus $educationstatus, EditEducationStatusRequest $request)
    {
        return new EditResponse($educationstatus);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEducationStatusRequestNamespace  $request
     * @param  App\Models\EducationStatuses\EducationStatus  $educationstatus
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateEducationStatusRequest $request, EducationStatus $educationstatus)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $educationstatus, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.educationstatuses.index'), ['flash_success' => _tr('alerts.backend.educationstatuses.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteEducationStatusRequestNamespace  $request
     * @param  App\Models\EducationStatuses\EducationStatus  $educationstatus
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(EducationStatus $educationstatus, DeleteEducationStatusRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($educationstatus);
        //returning with successfull message
        return new RedirectResponse(route('admin.educationstatuses.index'), ['flash_success' => _tr('alerts.backend.educationstatuses.deleted')]);
    }
    
}

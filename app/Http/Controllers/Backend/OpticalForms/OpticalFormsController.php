<?php

namespace App\Http\Controllers\Backend\OpticalForms;

use App\Models\OpticalForms\OpticalForm;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\OpticalForms\CreateResponse;
use App\Http\Responses\Backend\OpticalForms\EditResponse;
use App\Repositories\Backend\OpticalForms\OpticalFormRepository;
use App\Http\Requests\Backend\OpticalForms\ManageOpticalFormRequest;
use App\Http\Requests\Backend\OpticalForms\CreateOpticalFormRequest;
use App\Http\Requests\Backend\OpticalForms\StoreOpticalFormRequest;
use App\Http\Requests\Backend\OpticalForms\EditOpticalFormRequest;
use App\Http\Requests\Backend\OpticalForms\UpdateOpticalFormRequest;
use App\Http\Requests\Backend\OpticalForms\DeleteOpticalFormRequest;

/**
 * OpticalFormsController
 */
class OpticalFormsController extends Controller
{
    /**
     * variable to store the repository object
     * @var OpticalFormRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param OpticalFormRepository $repository;
     */
    public function __construct(OpticalFormRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\OpticalForms\ManageOpticalFormRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageOpticalFormRequest $request)
    {
        return new ViewResponse('backend.opticalforms.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateOpticalFormRequestNamespace  $request
     * @return \App\Http\Responses\Backend\OpticalForms\CreateResponse
     */
    public function create(CreateOpticalFormRequest $request)
    {
        return new CreateResponse('backend.opticalforms.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreOpticalFormRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreOpticalFormRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.opticalforms.index'), ['flash_success' => _tr('alerts.backend.opticalforms.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\OpticalForms\OpticalForm  $opticalform
     * @param  EditOpticalFormRequestNamespace  $request
     * @return \App\Http\Responses\Backend\OpticalForms\EditResponse
     */
    public function edit(OpticalForm $opticalform, EditOpticalFormRequest $request)
    {
        return new EditResponse($opticalform);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateOpticalFormRequestNamespace  $request
     * @param  App\Models\OpticalForms\OpticalForm  $opticalform
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateOpticalFormRequest $request, OpticalForm $opticalform)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $opticalform, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.opticalforms.index'), ['flash_success' => _tr('alerts.backend.opticalforms.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteOpticalFormRequestNamespace  $request
     * @param  App\Models\OpticalForms\OpticalForm  $opticalform
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(OpticalForm $opticalform, DeleteOpticalFormRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($opticalform);
        //returning with successfull message
        return new RedirectResponse(route('admin.opticalforms.index'), ['flash_success' => _tr('alerts.backend.opticalforms.deleted')]);
    }
    
}

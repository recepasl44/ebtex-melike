<?php

namespace App\Http\Controllers\Backend\OpticalAttributes;

use App\Models\OpticalAttributes\OpticalAttribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\OpticalAttributes\CreateResponse;
use App\Http\Responses\Backend\OpticalAttributes\EditResponse;
use App\Repositories\Backend\OpticalAttributes\OpticalAttributeRepository;
use App\Http\Requests\Backend\OpticalAttributes\ManageOpticalAttributeRequest;
use App\Http\Requests\Backend\OpticalAttributes\CreateOpticalAttributeRequest;
use App\Http\Requests\Backend\OpticalAttributes\StoreOpticalAttributeRequest;
use App\Http\Requests\Backend\OpticalAttributes\EditOpticalAttributeRequest;
use App\Http\Requests\Backend\OpticalAttributes\UpdateOpticalAttributeRequest;
use App\Http\Requests\Backend\OpticalAttributes\DeleteOpticalAttributeRequest;

/**
 * OpticalAttributesController
 */
class OpticalAttributesController extends Controller
{
    /**
     * variable to store the repository object
     * @var OpticalAttributeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param OpticalAttributeRepository $repository;
     */
    public function __construct(OpticalAttributeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\OpticalAttributes\ManageOpticalAttributeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageOpticalAttributeRequest $request)
    {
        return new ViewResponse('backend.opticalattributes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateOpticalAttributeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\OpticalAttributes\CreateResponse
     */
    public function create(CreateOpticalAttributeRequest $request)
    {
        return new CreateResponse('backend.opticalattributes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreOpticalAttributeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreOpticalAttributeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.opticalattributes.index'), ['flash_success' => _tr('alerts.backend.opticalattributes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\OpticalAttributes\OpticalAttribute  $opticalattribute
     * @param  EditOpticalAttributeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\OpticalAttributes\EditResponse
     */
    public function edit(OpticalAttribute $opticalattribute, EditOpticalAttributeRequest $request)
    {
        return new EditResponse($opticalattribute);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateOpticalAttributeRequestNamespace  $request
     * @param  App\Models\OpticalAttributes\OpticalAttribute  $opticalattribute
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateOpticalAttributeRequest $request, OpticalAttribute $opticalattribute)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $opticalattribute, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.opticalattributes.index'), ['flash_success' => _tr('alerts.backend.opticalattributes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteOpticalAttributeRequestNamespace  $request
     * @param  App\Models\OpticalAttributes\OpticalAttribute  $opticalattribute
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(OpticalAttribute $opticalattribute, DeleteOpticalAttributeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($opticalattribute);
        //returning with successfull message
        return new RedirectResponse(route('admin.opticalattributes.index'), ['flash_success' => _tr('alerts.backend.opticalattributes.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\ComponentValues;

use App\Models\ComponentValues\ComponentValue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ComponentValues\CreateResponse;
use App\Http\Responses\Backend\ComponentValues\EditResponse;
use App\Repositories\Backend\ComponentValues\ComponentValueRepository;
use App\Http\Requests\Backend\ComponentValues\ManageComponentValueRequest;
use App\Http\Requests\Backend\ComponentValues\CreateComponentValueRequest;
use App\Http\Requests\Backend\ComponentValues\StoreComponentValueRequest;
use App\Http\Requests\Backend\ComponentValues\EditComponentValueRequest;
use App\Http\Requests\Backend\ComponentValues\UpdateComponentValueRequest;
use App\Http\Requests\Backend\ComponentValues\DeleteComponentValueRequest;

/**
 * ComponentValuesController
 */
class ComponentValuesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ComponentValueRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ComponentValueRepository $repository;
     */
    public function __construct(ComponentValueRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ComponentValues\ManageComponentValueRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageComponentValueRequest $request)
    {
        return new ViewResponse('backend.componentvalues.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateComponentValueRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ComponentValues\CreateResponse
     */
    public function create(CreateComponentValueRequest $request)
    {
        return new CreateResponse('backend.componentvalues.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreComponentValueRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreComponentValueRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.componentvalues.index'), ['flash_success' => _tr('alerts.backend.componentvalues.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ComponentValues\ComponentValue  $componentvalue
     * @param  EditComponentValueRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ComponentValues\EditResponse
     */
    public function edit($id, EditComponentValueRequest $request)
    {
        $componentvalue = $this->repository->find($id);
        return new EditResponse($componentvalue);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateComponentValueRequestNamespace  $request
     * @param  App\Models\ComponentValues\ComponentValue  $componentvalue
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateComponentValueRequest $request, $id)
    {
        $componentvalue = $this->repository->find($id);
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $componentvalue, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.componentvalues.index'), ['flash_success' => _tr('alerts.backend.componentvalues.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteComponentValueRequestNamespace  $request
     * @param  App\Models\ComponentValues\ComponentValue  $componentvalue
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy($id, DeleteComponentValueRequest $request)
    {
        $componentvalue = $this->repository->find($id);
        //Calling the delete method on repository
        $this->repository->delete($componentvalue);
        //returning with successfull message
        return new RedirectResponse(route('admin.componentvalues.index'), ['flash_success' => _tr('alerts.backend.componentvalues.deleted')]);
    }
    
}

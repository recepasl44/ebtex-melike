<?php

namespace App\Http\Controllers\Backend\Components;

use App\Models\Components\Component;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Components\CreateResponse;
use App\Http\Responses\Backend\Components\EditResponse;
use App\Repositories\Backend\Components\ComponentRepository;
use App\Http\Requests\Backend\Components\ManageComponentRequest;
use App\Http\Requests\Backend\Components\CreateComponentRequest;
use App\Http\Requests\Backend\Components\StoreComponentRequest;
use App\Http\Requests\Backend\Components\EditComponentRequest;
use App\Http\Requests\Backend\Components\UpdateComponentRequest;
use App\Http\Requests\Backend\Components\DeleteComponentRequest;

/**
 * ComponentsController
 */
class ComponentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ComponentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ComponentRepository $repository;
     */
    public function __construct(ComponentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Components\ManageComponentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageComponentRequest $request)
    {
        return new ViewResponse('backend.components.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateComponentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Components\CreateResponse
     */
    public function create(CreateComponentRequest $request)
    {
        return new CreateResponse('backend.components.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreComponentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreComponentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.components.index'), ['flash_success' => _tr('alerts.backend.components.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Components\Component  $component
     * @param  EditComponentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Components\EditResponse
     */
    public function edit(Component $component, EditComponentRequest $request)
    {
        return new EditResponse($component);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateComponentRequestNamespace  $request
     * @param  App\Models\Components\Component  $component
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateComponentRequest $request, Component $component)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $component, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.components.index'), ['flash_success' => _tr('alerts.backend.components.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteComponentRequestNamespace  $request
     * @param  App\Models\Components\Component  $component
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Component $component, DeleteComponentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($component);
        //returning with successfull message
        return new RedirectResponse(route('admin.components.index'), ['flash_success' => _tr('alerts.backend.components.deleted')]);
    }
    
}

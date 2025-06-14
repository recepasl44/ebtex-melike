<?php

namespace App\Http\Controllers\Backend\Models;

use App\Models\Models\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Models\CreateResponse;
use App\Http\Responses\Backend\Models\EditResponse;
use App\Repositories\Backend\Models\ModelRepository;
use App\Http\Requests\Backend\Models\ManageModelRequest;
use App\Http\Requests\Backend\Models\CreateModelRequest;
use App\Http\Requests\Backend\Models\StoreModelRequest;
use App\Http\Requests\Backend\Models\EditModelRequest;
use App\Http\Requests\Backend\Models\UpdateModelRequest;
use App\Http\Requests\Backend\Models\DeleteModelRequest;

/**
 * ModelsController
 */
class ModelsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ModelRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ModelRepository $repository;
     */
    public function __construct(ModelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Models\ManageModelRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageModelRequest $request)
    {
        return new ViewResponse('backend.models.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateModelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Models\CreateResponse
     */
    public function create(CreateModelRequest $request)
    {
        return new CreateResponse('backend.models.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreModelRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreModelRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.models.index'), ['flash_success' => _tr('alerts.backend.models.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Models\Model  $model
     * @param  EditModelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Models\EditResponse
     */
    public function edit(Model $model, EditModelRequest $request)
    {
        return new EditResponse($model);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateModelRequestNamespace  $request
     * @param  App\Models\Models\Model  $model
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateModelRequest $request, Model $model)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $model, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.models.index'), ['flash_success' => _tr('alerts.backend.models.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteModelRequestNamespace  $request
     * @param  App\Models\Models\Model  $model
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Model $model, DeleteModelRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($model);
        //returning with successfull message
        return new RedirectResponse(route('admin.models.index'), ['flash_success' => _tr('alerts.backend.models.deleted')]);
    }
    
}

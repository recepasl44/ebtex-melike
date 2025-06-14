<?php

namespace App\Http\Controllers\Backend\FieldManagers;

use App\Models\FieldManagers\FieldManager;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\FieldManagers\CreateResponse;
use App\Http\Responses\Backend\FieldManagers\EditResponse;
use App\Repositories\Backend\FieldManagers\FieldManagerRepository;
use App\Http\Requests\Backend\FieldManagers\ManageFieldManagerRequest;
use App\Http\Requests\Backend\FieldManagers\CreateFieldManagerRequest;
use App\Http\Requests\Backend\FieldManagers\StoreFieldManagerRequest;
use App\Http\Requests\Backend\FieldManagers\EditFieldManagerRequest;
use App\Http\Requests\Backend\FieldManagers\UpdateFieldManagerRequest;
use App\Http\Requests\Backend\FieldManagers\DeleteFieldManagerRequest;

/**
 * FieldManagersController
 */
class FieldManagersController extends Controller
{
    /**
     * variable to store the repository object
     * @var FieldManagerRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param FieldManagerRepository $repository;
     */
    public function __construct(FieldManagerRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\FieldManagers\ManageFieldManagerRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageFieldManagerRequest $request)
    {
        return new ViewResponse('backend.fieldmanagers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateFieldManagerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\FieldManagers\CreateResponse
     */
    public function create(CreateFieldManagerRequest $request)
    {
        return new CreateResponse('backend.fieldmanagers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreFieldManagerRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreFieldManagerRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.fieldmanagers.index'), ['flash_success' => _tr('alerts.backend.fieldmanagers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\FieldManagers\FieldManager  $fieldmanager
     * @param  EditFieldManagerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\FieldManagers\EditResponse
     */
    public function edit(FieldManager $fieldmanager, EditFieldManagerRequest $request)
    {
        return new EditResponse($fieldmanager);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateFieldManagerRequestNamespace  $request
     * @param  App\Models\FieldManagers\FieldManager  $fieldmanager
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateFieldManagerRequest $request, FieldManager $fieldmanager)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $fieldmanager, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.fieldmanagers.index'), ['flash_success' => _tr('alerts.backend.fieldmanagers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteFieldManagerRequestNamespace  $request
     * @param  App\Models\FieldManagers\FieldManager  $fieldmanager
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(FieldManager $fieldmanager, DeleteFieldManagerRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($fieldmanager);
        //returning with successfull message
        return new RedirectResponse(route('admin.fieldmanagers.index'), ['flash_success' => _tr('alerts.backend.fieldmanagers.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\Classes;

use App\Models\Classes\Class;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Classes\CreateResponse;
use App\Http\Responses\Backend\Classes\EditResponse;
use App\Repositories\Backend\Classes\ClassRepository;
use App\Http\Requests\Backend\Classes\ManageClassRequest;
use App\Http\Requests\Backend\Classes\CreateClassRequest;
use App\Http\Requests\Backend\Classes\StoreClassRequest;
use App\Http\Requests\Backend\Classes\EditClassRequest;
use App\Http\Requests\Backend\Classes\UpdateClassRequest;
use App\Http\Requests\Backend\Classes\DeleteClassRequest;

/**
 * ClassesController
 */
class ClassesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ClassRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ClassRepository $repository;
     */
    public function __construct(ClassRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Classes\ManageClassRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageClassRequest $request)
    {
        return new ViewResponse('backend.classes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateClassRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Classes\CreateResponse
     */
    public function create(CreateClassRequest $request)
    {
        return new CreateResponse('backend.classes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreClassRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreClassRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.classes.index'), ['flash_success' => _tr('alerts.backend.classes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Classes\Class  $class
     * @param  EditClassRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Classes\EditResponse
     */
    public function edit(Class $class, EditClassRequest $request)
    {
        return new EditResponse($class);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateClassRequestNamespace  $request
     * @param  App\Models\Classes\Class  $class
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateClassRequest $request, Class $class)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $class, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.classes.index'), ['flash_success' => _tr('alerts.backend.classes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteClassRequestNamespace  $request
     * @param  App\Models\Classes\Class  $class
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Class $class, DeleteClassRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($class);
        //returning with successfull message
        return new RedirectResponse(route('admin.classes.index'), ['flash_success' => _tr('alerts.backend.classes.deleted')]);
    }
    
}

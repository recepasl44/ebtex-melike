<?php

namespace App\Http\Controllers\Backend\SchoolTypes;

use App\Models\SchoolTypes\SchoolType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SchoolTypes\CreateResponse;
use App\Http\Responses\Backend\SchoolTypes\EditResponse;
use App\Repositories\Backend\SchoolTypes\SchoolTypeRepository;
use App\Http\Requests\Backend\SchoolTypes\ManageSchoolTypeRequest;
use App\Http\Requests\Backend\SchoolTypes\CreateSchoolTypeRequest;
use App\Http\Requests\Backend\SchoolTypes\StoreSchoolTypeRequest;
use App\Http\Requests\Backend\SchoolTypes\EditSchoolTypeRequest;
use App\Http\Requests\Backend\SchoolTypes\UpdateSchoolTypeRequest;
use App\Http\Requests\Backend\SchoolTypes\DeleteSchoolTypeRequest;

/**
 * SchoolTypesController
 */
class SchoolTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolTypeRepository $repository;
     */
    public function __construct(SchoolTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SchoolTypes\ManageSchoolTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSchoolTypeRequest $request)
    {
        return new ViewResponse('backend.schooltypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSchoolTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SchoolTypes\CreateResponse
     */
    public function create(CreateSchoolTypeRequest $request)
    {
        return new CreateResponse('backend.schooltypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSchoolTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSchoolTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.schooltypes.index'), ['flash_success' => _tr('alerts.backend.schooltypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SchoolTypes\SchoolType  $schooltype
     * @param  EditSchoolTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SchoolTypes\EditResponse
     */
    public function edit(SchoolType $schooltype, EditSchoolTypeRequest $request)
    {
        return new EditResponse($schooltype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSchoolTypeRequestNamespace  $request
     * @param  App\Models\SchoolTypes\SchoolType  $schooltype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSchoolTypeRequest $request, SchoolType $schooltype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $schooltype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.schooltypes.index'), ['flash_success' => _tr('alerts.backend.schooltypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSchoolTypeRequestNamespace  $request
     * @param  App\Models\SchoolTypes\SchoolType  $schooltype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SchoolType $schooltype, DeleteSchoolTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($schooltype);
        //returning with successfull message
        return new RedirectResponse(route('admin.schooltypes.index'), ['flash_success' => _tr('alerts.backend.schooltypes.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\TestTypes;

use App\Models\TestTypes\TestType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\TestTypes\CreateResponse;
use App\Http\Responses\Backend\TestTypes\EditResponse;
use App\Repositories\Backend\TestTypes\TestTypeRepository;
use App\Http\Requests\Backend\TestTypes\ManageTestTypeRequest;
use App\Http\Requests\Backend\TestTypes\CreateTestTypeRequest;
use App\Http\Requests\Backend\TestTypes\StoreTestTypeRequest;
use App\Http\Requests\Backend\TestTypes\EditTestTypeRequest;
use App\Http\Requests\Backend\TestTypes\UpdateTestTypeRequest;
use App\Http\Requests\Backend\TestTypes\DeleteTestTypeRequest;

/**
 * TestTypesController
 */
class TestTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestTypeRepository $repository;
     */
    public function __construct(TestTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\TestTypes\ManageTestTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTestTypeRequest $request)
    {
        return new ViewResponse('backend.testtypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTestTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestTypes\CreateResponse
     */
    public function create(CreateTestTypeRequest $request)
    {
        return new CreateResponse('backend.testtypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTestTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTestTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.testtypes.index'), ['flash_success' => _tr('alerts.backend.testtypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\TestTypes\TestType  $testtype
     * @param  EditTestTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestTypes\EditResponse
     */
    public function edit(TestType $testtype, EditTestTypeRequest $request)
    {
        return new EditResponse($testtype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTestTypeRequestNamespace  $request
     * @param  App\Models\TestTypes\TestType  $testtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTestTypeRequest $request, TestType $testtype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $testtype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.testtypes.index'), ['flash_success' => _tr('alerts.backend.testtypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTestTypeRequestNamespace  $request
     * @param  App\Models\TestTypes\TestType  $testtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(TestType $testtype, DeleteTestTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($testtype);
        //returning with successfull message
        return new RedirectResponse(route('admin.testtypes.index'), ['flash_success' => _tr('alerts.backend.testtypes.deleted')]);
    }
    
}

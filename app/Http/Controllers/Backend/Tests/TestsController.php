<?php

namespace App\Http\Controllers\Backend\Tests;

use App\Models\Tests\Test;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Tests\CreateResponse;
use App\Http\Responses\Backend\Tests\EditResponse;
use App\Repositories\Backend\Tests\TestRepository;
use App\Http\Requests\Backend\Tests\ManageTestRequest;
use App\Http\Requests\Backend\Tests\CreateTestRequest;
use App\Http\Requests\Backend\Tests\StoreTestRequest;
use App\Http\Requests\Backend\Tests\EditTestRequest;
use App\Http\Requests\Backend\Tests\UpdateTestRequest;
use App\Http\Requests\Backend\Tests\DeleteTestRequest;

/**
 * TestsController
 */
class TestsController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestRepository $repository;
     */
    public function __construct(TestRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Tests\ManageTestRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTestRequest $request)
    {
        return new ViewResponse('backend.tests.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTestRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Tests\CreateResponse
     */
    public function create(CreateTestRequest $request)
    {
        return new CreateResponse('backend.tests.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTestRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTestRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.tests.index'), ['flash_success' => _tr('alerts.backend.tests.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Tests\Test  $test
     * @param  EditTestRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Tests\EditResponse
     */
    public function edit(Test $test, EditTestRequest $request)
    {
        return new EditResponse($test);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTestRequestNamespace  $request
     * @param  App\Models\Tests\Test  $test
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTestRequest $request, Test $test)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $test, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.tests.index'), ['flash_success' => _tr('alerts.backend.tests.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTestRequestNamespace  $request
     * @param  App\Models\Tests\Test  $test
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Test $test, DeleteTestRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($test);
        //returning with successfull message
        return new RedirectResponse(route('admin.tests.index'), ['flash_success' => _tr('alerts.backend.tests.deleted')]);
    }
    
}

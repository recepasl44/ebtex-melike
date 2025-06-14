<?php

namespace App\Http\Controllers\Backend\TestAttendances;

use App\Models\TestAttendances\TestAttendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\TestAttendances\CreateResponse;
use App\Http\Responses\Backend\TestAttendances\EditResponse;
use App\Repositories\Backend\TestAttendances\TestAttendanceRepository;
use App\Http\Requests\Backend\TestAttendances\ManageTestAttendanceRequest;
use App\Http\Requests\Backend\TestAttendances\CreateTestAttendanceRequest;
use App\Http\Requests\Backend\TestAttendances\StoreTestAttendanceRequest;
use App\Http\Requests\Backend\TestAttendances\EditTestAttendanceRequest;
use App\Http\Requests\Backend\TestAttendances\UpdateTestAttendanceRequest;
use App\Http\Requests\Backend\TestAttendances\DeleteTestAttendanceRequest;

/**
 * TestAttendancesController
 */
class TestAttendancesController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestAttendanceRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestAttendanceRepository $repository;
     */
    public function __construct(TestAttendanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\TestAttendances\ManageTestAttendanceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTestAttendanceRequest $request)
    {
        return new ViewResponse('backend.testattendances.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTestAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestAttendances\CreateResponse
     */
    public function create(CreateTestAttendanceRequest $request)
    {
        return new CreateResponse('backend.testattendances.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTestAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTestAttendanceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.testattendances.index'), ['flash_success' => _tr('alerts.backend.testattendances.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\TestAttendances\TestAttendance  $testattendance
     * @param  EditTestAttendanceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\TestAttendances\EditResponse
     */
    public function edit(TestAttendance $testattendance, EditTestAttendanceRequest $request)
    {
        return new EditResponse($testattendance);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTestAttendanceRequestNamespace  $request
     * @param  App\Models\TestAttendances\TestAttendance  $testattendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTestAttendanceRequest $request, TestAttendance $testattendance)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $testattendance, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.testattendances.index'), ['flash_success' => _tr('alerts.backend.testattendances.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTestAttendanceRequestNamespace  $request
     * @param  App\Models\TestAttendances\TestAttendance  $testattendance
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(TestAttendance $testattendance, DeleteTestAttendanceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($testattendance);
        //returning with successfull message
        return new RedirectResponse(route('admin.testattendances.index'), ['flash_success' => _tr('alerts.backend.testattendances.deleted')]);
    }
    
}

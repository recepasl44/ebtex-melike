<?php

namespace App\Http\Controllers\Backend\StudentInfos;

use App\Models\StudentInfos\StudentInfo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\StudentInfos\CreateResponse;
use App\Http\Responses\Backend\StudentInfos\EditResponse;
use App\Repositories\Backend\StudentInfos\StudentInfoRepository;
use App\Http\Requests\Backend\StudentInfos\ManageStudentInfoRequest;
use App\Http\Requests\Backend\StudentInfos\CreateStudentInfoRequest;
use App\Http\Requests\Backend\StudentInfos\StoreStudentInfoRequest;
use App\Http\Requests\Backend\StudentInfos\EditStudentInfoRequest;
use App\Http\Requests\Backend\StudentInfos\UpdateStudentInfoRequest;
use App\Http\Requests\Backend\StudentInfos\DeleteStudentInfoRequest;

/**
 * StudentInfosController
 */
class StudentInfosController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentInfoRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentInfoRepository $repository;
     */
    public function __construct(StudentInfoRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\StudentInfos\ManageStudentInfoRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageStudentInfoRequest $request)
    {
        return new ViewResponse('backend.studentinfos.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateStudentInfoRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentInfos\CreateResponse
     */
    public function create(CreateStudentInfoRequest $request)
    {
        return new CreateResponse('backend.studentinfos.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreStudentInfoRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreStudentInfoRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.studentinfos.index'), ['flash_success' => _tr('alerts.backend.studentinfos.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\StudentInfos\StudentInfo  $studentinfo
     * @param  EditStudentInfoRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentInfos\EditResponse
     */
    public function edit(StudentInfo $studentinfo, EditStudentInfoRequest $request)
    {
        return new EditResponse($studentinfo);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateStudentInfoRequestNamespace  $request
     * @param  App\Models\StudentInfos\StudentInfo  $studentinfo
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateStudentInfoRequest $request, StudentInfo $studentinfo)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $studentinfo, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.studentinfos.index'), ['flash_success' => _tr('alerts.backend.studentinfos.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteStudentInfoRequestNamespace  $request
     * @param  App\Models\StudentInfos\StudentInfo  $studentinfo
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(StudentInfo $studentinfo, DeleteStudentInfoRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($studentinfo);
        //returning with successfull message
        return new RedirectResponse(route('admin.studentinfos.index'), ['flash_success' => _tr('alerts.backend.studentinfos.deleted')]);
    }
    
}

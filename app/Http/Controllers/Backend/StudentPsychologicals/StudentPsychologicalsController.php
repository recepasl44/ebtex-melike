<?php

namespace App\Http\Controllers\Backend\StudentPsychologicals;

use App\Models\StudentPsychologicals\StudentPsychological;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\StudentPsychologicals\CreateResponse;
use App\Http\Responses\Backend\StudentPsychologicals\EditResponse;
use App\Repositories\Backend\StudentPsychologicals\StudentPsychologicalRepository;
use App\Http\Requests\Backend\StudentPsychologicals\ManageStudentPsychologicalRequest;
use App\Http\Requests\Backend\StudentPsychologicals\CreateStudentPsychologicalRequest;
use App\Http\Requests\Backend\StudentPsychologicals\StoreStudentPsychologicalRequest;
use App\Http\Requests\Backend\StudentPsychologicals\EditStudentPsychologicalRequest;
use App\Http\Requests\Backend\StudentPsychologicals\UpdateStudentPsychologicalRequest;
use App\Http\Requests\Backend\StudentPsychologicals\DeleteStudentPsychologicalRequest;

/**
 * StudentPsychologicalsController
 */
class StudentPsychologicalsController extends Controller
{
    /**
     * variable to store the repository object
     * @var StudentPsychologicalRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentPsychologicalRepository $repository;
     */
    public function __construct(StudentPsychologicalRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\StudentPsychologicals\ManageStudentPsychologicalRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageStudentPsychologicalRequest $request)
    {
        return new ViewResponse('backend.studentpsychologicals.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateStudentPsychologicalRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentPsychologicals\CreateResponse
     */
    public function create(CreateStudentPsychologicalRequest $request)
    {
        return new CreateResponse('backend.studentpsychologicals.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreStudentPsychologicalRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreStudentPsychologicalRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.studentpsychologicals.index'), ['flash_success' => _tr('alerts.backend.studentpsychologicals.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\StudentPsychologicals\StudentPsychological  $studentpsychological
     * @param  EditStudentPsychologicalRequestNamespace  $request
     * @return \App\Http\Responses\Backend\StudentPsychologicals\EditResponse
     */
    public function edit(StudentPsychological $studentpsychological, EditStudentPsychologicalRequest $request)
    {
        return new EditResponse($studentpsychological);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateStudentPsychologicalRequestNamespace  $request
     * @param  App\Models\StudentPsychologicals\StudentPsychological  $studentpsychological
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateStudentPsychologicalRequest $request, StudentPsychological $studentpsychological)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $studentpsychological, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.studentpsychologicals.index'), ['flash_success' => _tr('alerts.backend.studentpsychologicals.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteStudentPsychologicalRequestNamespace  $request
     * @param  App\Models\StudentPsychologicals\StudentPsychological  $studentpsychological
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(StudentPsychological $studentpsychological, DeleteStudentPsychologicalRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($studentpsychological);
        //returning with successfull message
        return new RedirectResponse(route('admin.studentpsychologicals.index'), ['flash_success' => _tr('alerts.backend.studentpsychologicals.deleted')]);
    }
    
}

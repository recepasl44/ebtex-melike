<?php

namespace App\Http\Controllers\Backend\Programs;

use App\Models\Programs\Program;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Programs\CreateResponse;
use App\Http\Responses\Backend\Programs\EditResponse;
use App\Repositories\Backend\Programs\ProgramRepository;
use App\Http\Requests\Backend\Programs\ManageProgramRequest;
use App\Http\Requests\Backend\Programs\CreateProgramRequest;
use App\Http\Requests\Backend\Programs\StoreProgramRequest;
use App\Http\Requests\Backend\Programs\EditProgramRequest;
use App\Http\Requests\Backend\Programs\UpdateProgramRequest;
use App\Http\Requests\Backend\Programs\DeleteProgramRequest;

/**
 * ProgramsController
 */
class ProgramsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ProgramRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ProgramRepository $repository;
     */
    public function __construct(ProgramRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Programs\ManageProgramRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageProgramRequest $request)
    {
        return new ViewResponse('backend.programs.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateProgramRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Programs\CreateResponse
     */
    public function create(CreateProgramRequest $request)
    {
        return new CreateResponse('backend.programs.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreProgramRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreProgramRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.programs.index'), ['flash_success' => _tr('alerts.backend.programs.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Programs\Program  $program
     * @param  EditProgramRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Programs\EditResponse
     */
    public function edit(Program $program, EditProgramRequest $request)
    {
        return new EditResponse($program);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProgramRequestNamespace  $request
     * @param  App\Models\Programs\Program  $program
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateProgramRequest $request, Program $program)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $program, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.programs.index'), ['flash_success' => _tr('alerts.backend.programs.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteProgramRequestNamespace  $request
     * @param  App\Models\Programs\Program  $program
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Program $program, DeleteProgramRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($program);
        //returning with successfull message
        return new RedirectResponse(route('admin.programs.index'), ['flash_success' => _tr('alerts.backend.programs.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\Projects;

use App\Models\Projects\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Projects\CreateResponse;
use App\Http\Responses\Backend\Projects\EditResponse;
use App\Repositories\Backend\Projects\ProjectRepository;
use App\Http\Requests\Backend\Projects\ManageProjectRequest;
use App\Http\Requests\Backend\Projects\CreateProjectRequest;
use App\Http\Requests\Backend\Projects\StoreProjectRequest;
use App\Http\Requests\Backend\Projects\EditProjectRequest;
use App\Http\Requests\Backend\Projects\UpdateProjectRequest;
use App\Http\Requests\Backend\Projects\DeleteProjectRequest;

/**
 * ProjectsController
 */
class ProjectsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ProjectRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ProjectRepository $repository;
     */
    public function __construct(ProjectRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Projects\ManageProjectRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageProjectRequest $request)
    {
        return new ViewResponse('backend.projects.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateProjectRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Projects\CreateResponse
     */
    public function create(CreateProjectRequest $request)
    {
        return new CreateResponse('backend.projects.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreProjectRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreProjectRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/projects','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.projects.index'), ['flash_success' => _tr('alerts.backend.projects.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Projects\Project  $project
     * @param  EditProjectRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Projects\EditResponse
     */
    public function edit(Project $project, EditProjectRequest $request)
    {
        return new EditResponse($project);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProjectRequestNamespace  $request
     * @param  App\Models\Projects\Project  $project
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Update the model using repository update method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/projects','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $project, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.projects.index'), ['flash_success' => _tr('alerts.backend.projects.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteProjectRequestNamespace  $request
     * @param  App\Models\Projects\Project  $project
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Project $project, DeleteProjectRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($project);
        //returning with successfull message
        return new RedirectResponse(route('admin.projects.index'), ['flash_success' => _tr('alerts.backend.projects.deleted')]);
    }
    
}

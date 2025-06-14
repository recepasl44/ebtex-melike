<?php

namespace App\Http\Controllers\Backend\Levels;

use App\Models\Levels\Level;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Levels\CreateResponse;
use App\Http\Responses\Backend\Levels\EditResponse;
use App\Repositories\Backend\Levels\LevelRepository;
use App\Http\Requests\Backend\Levels\ManageLevelRequest;
use App\Http\Requests\Backend\Levels\CreateLevelRequest;
use App\Http\Requests\Backend\Levels\StoreLevelRequest;
use App\Http\Requests\Backend\Levels\EditLevelRequest;
use App\Http\Requests\Backend\Levels\UpdateLevelRequest;
use App\Http\Requests\Backend\Levels\DeleteLevelRequest;

/**
 * LevelsController
 */
class LevelsController extends Controller
{
    /**
     * variable to store the repository object
     * @var LevelRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param LevelRepository $repository;
     */
    public function __construct(LevelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Levels\ManageLevelRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageLevelRequest $request)
    {
        return new ViewResponse('backend.levels.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateLevelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Levels\CreateResponse
     */
    public function create(CreateLevelRequest $request)
    {
        return new CreateResponse('backend.levels.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreLevelRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreLevelRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.levels.index'), ['flash_success' => _tr('alerts.backend.levels.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Levels\Level  $level
     * @param  EditLevelRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Levels\EditResponse
     */
    public function edit(Level $level, EditLevelRequest $request)
    {
        return new EditResponse($level);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateLevelRequestNamespace  $request
     * @param  App\Models\Levels\Level  $level
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateLevelRequest $request, Level $level)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $level, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.levels.index'), ['flash_success' => _tr('alerts.backend.levels.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteLevelRequestNamespace  $request
     * @param  App\Models\Levels\Level  $level
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Level $level, DeleteLevelRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($level);
        //returning with successfull message
        return new RedirectResponse(route('admin.levels.index'), ['flash_success' => _tr('alerts.backend.levels.deleted')]);
    }
    
}
